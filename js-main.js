window.onload = function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext('2d');
    setup();
    const fps = 60;
    setInterval(main, 1000/fps);
}

function setup() {
    console.log("setup");

    //activate live value tracking
    let vars = $('input[type=range]');
    for(let item of vars) {
        let id_in = '#'+item.id,
            id_out = id_in.replace('input','output');
        $(id_out).text($(id_in).val()/10);
        $(id_in).on('input', () => {
            $(id_out).text($(id_in).val()/10);
        });
    }

    //prevent zero y-axis height
    $('#ymin-range-input').on('input', () => {
        if($('#ymax-range-input').val() == 0 && $('#ymin-range-input').val() == 0) {
            $('#ymin-range-input').val(-1);
            $('#ymin-range-output').text($('#ymin-range-input').val()/10);
        }
    });

    $('#ymax-range-input').on('input', () => {
        if($('#ymin-range-input').val() == 0 && $('#ymax-range-input').val() == 0) {
            $('#ymax-range-input').val(1);
            $('#ymax-range-output').text($('#ymax-range-input').val()/10);
        }
    });

    //modify xstep labels
    switch($('#xstep-range-input').val()) {
        case '1':
            $('#xstep-text-output').text('Poor');
            break;
        case '2':
            $('#xstep-text-output').text('Good');
            break;
        case '3':
            $('#xstep-text-output').text('Better');
            break;
        case '4':
            $('#xstep-text-output').text('Great');
            break;
        default:
            console.log($('#xstep-range-input').val());
            break;
    }
    $('#xstep-range-input').on('input', () => {
        switch($('#xstep-range-input').val()) {
            case '1':
                $('#xstep-text-output').text('Poor');
                break;
            case '2':
                $('#xstep-text-output').text('Good');
                break;
            case '3':
                $('#xstep-text-output').text('Better');
                break;
            case '4':
                $('#xstep-text-output').text('Great');
                break;
            default:
                console.log($('#xstep-range-input').val());
                break;
        }
    });

    //change_omega_status();



    //define global plot size
    plot = {
        width: canv.width-50,
        height: canv.height-50,
        t: 0,
        tstep: 0.1,
        tmax: 5,
        tstart: performance.now(),
        tscale: 1/1500,
        w: $('#w-range-input').val()/10
    };
}

function change_omega_status() {
    //change omega status
    $('#w-range-input').val($('#b0-range-input').val()*$('#k-range-input').val()/10);
    $('#w-range-output').text($('#w-range-input').val()/10);
    $('#w-range-input')[0].disabled = true;
    $('#w-range-input').css('opacity',0.2);

    $('#lock-ratio').on('click', () => {
        if($('#lock-ratio')[0].checked) {
            update_omega();
            $('#w-range-input')[0].disabled = true;
            $('#w-range-input').css('opacity',0.2);
        } else {
            let w = plot.w > 10 ? 10 : plot.w;
            $('#w-range-input').val(Math.round(w)*10);
            $('#w-range-input')[0].disabled = false;
            $('#w-range-input').css('opacity',0.7);
            $('#w-range-input').on('input', () => {
                update_omega();
            });
        }
    });

    //update omega regularly
    $('#k-range-input').on('input', () => {
        if($('#lock-ratio')[0].checked) {
            update_omega();
        }
    });
    $('#b0-range-input').on('input', () => {
        if($('#lock-ratio')[0].checked) {
            update_omega();
        }
    });
}

function update_omega() {
    let val = $('#b0-range-input').val()*$('#k-range-input').val()/10;
    if(val <= 100) $('#w-range-input').val(val);
    plot.w = Math.round(val*10)/100;
    $('#w-range-output').text(plot.w);
}

function line(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}

function draw_axes() {

    const xmin = $('#xmin-range-input').val()/10,
          xmax = $('#xmax-range-input').val()/10,
          ymin = $('#ymin-range-input').val()/10,
          ymax = $('#ymax-range-input').val()/10,
          yaxisval = (canv.width-plot.width)/2+(-xmin/(xmax-xmin))*plot.width,
          xaxisval = (canv.height-plot.height)/2+(-ymin/(ymax-ymin))*plot.height;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    line(yaxisval,(canv.height-plot.height)/2,
         yaxisval,(canv.height-plot.height)/2+plot.height);
    line((canv.width-plot.width)/2,canv.height-xaxisval,
         (canv.width-plot.width)/2+plot.width,canv.height-xaxisval);

}

function draw_tick_marks() {

    //define variables

    const xmin = $('#xmin-range-input').val()/10,
          xmax = $('#xmax-range-input').val()/10,
          ymin = $('#ymin-range-input').val()/10,
          ymax = $('#ymax-range-input').val()/10,
          left = (canv.width-plot.width)/2,
          top = (canv.height-plot.height)/2,
          yaxisval = left+(-xmin/(xmax-xmin))*plot.width,
          xaxisval = top+(-ymin/(ymax-ymin))*plot.height,
          xscale = plot.width/(xmax-xmin),
          yscale = plot.height/(ymax-ymin);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

    //x-xaxis tick calculation

    let tickstep = Math.PI;
    while((xmax-xmin)/tickstep < 5) {
        tickstep /= 2;
    }

    let xcur = Math.ceil((xmin/tickstep))*tickstep,
        xticks = [];

    while(xcur < xmax) {
        xticks.push(xcur);
        line((xcur-xmin)*xscale+left,canv.height-xaxisval-5,(xcur-xmin)*xscale+left,canv.height-xaxisval+5);
        xcur += tickstep;
    }

    //add x-axis tick labels

    ctx.font = "bold 10pt Arial";
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    for(let xval of xticks) {
        let mult = (Math.round(xval/Math.PI*1000)/1000),
            dec = mult - Math.floor(mult),
            denom = Math.pow(dec,-1),
            num = Math.floor(mult)*denom;
        //console.log({mult:mult,dec:dec,num:num,denom:denom});
        num = num > 1 ? num : "";
        denom = denom > 1 ? '/'+denom : "";
        ctx.fillText(mult.toString()+String.fromCharCode(960),left+(xval-xmin)*xscale,canv.height-xaxisval+18);
    }

    //y-axis tick calculation

    tickstep = 8;
    while((ymax-ymin)/tickstep < 4) {
        tickstep /= 2;
    }

    let ycur = Math.ceil((ymin/tickstep))*tickstep,
        yticks = [];

    while(ycur < ymax) {
        yticks.push(ycur);
        line(yaxisval-5,canv.height-(ycur-ymin)*yscale-top, yaxisval+5,canv.height-(ycur-ymin)*yscale-top);
        ycur += tickstep;
    }

    //add y-axis tick labels

    ctx.font = 'bold 10pt Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'end';
    for(let yval of yticks) {
        ctx.fillText(yval.toString(),yaxisval-8,canv.height-top-(yval-ymin)*yscale+4);
    }


}

function draw_plot_box() {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.strokeRect((canv.width-plot.width)/2,(canv.height-plot.height)/2,plot.width,plot.height);
}

function clear_background() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,canv.width,canv.height);
}

function compute_plot_points() {

    //define points array
    let pts = [];

    //determine xstep
    let xstep;
    switch($('#xstep-range-input').val()) {
        case '1':
            xstep = 0.16;
            break;
        case '2':
            xstep = 0.08;
            break;
        case '3':
            xstep = 0.04;
            break;
        case '4':
            xstep = 0.02;
            break;
        default:
            break;
    }

    //update t value
    plot.t = plot.tscale * (performance.now()-plot.tstart);
    if(plot.t > plot.tmax) {
        plot.tstart = performance.now();
        plot.t = 0;
    }

    //loop through x values
    for(let x=$('#xmin-range-input').val()/10; x<$('#xmax-range-input').val()/10; x+=xstep) {
        pts.push({x:x,y:f(x)});
    }

    return pts;
}

function f(x) {
    const k = $('#k-range-input').val()/10,
          w = $('#w-range-input').val()/10,
          a = 4;
    return a*Math.cos(k*x-w*plot.t);
}

function draw_plot_points(pts,color) {

    const xmin = $('#xmin-range-input').val()/10,
          xmax = $('#xmax-range-input').val()/10,
          ymin = $('#ymin-range-input').val()/10,
          ymax = $('#ymax-range-input').val()/10,
          left = (canv.width-plot.width)/2,
          top = (canv.height-plot.height)/2,
          xscale = plot.width/(xmax-xmin),
          yscale = plot.height/(ymax-ymin);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    for(let i=0; i<pts.length-1; ++i) {
        line((pts[i].x-xmin)*xscale+left,canv.height-(pts[i].y-ymin)*yscale-top,
             (pts[i+1].x-xmin)*xscale+left,canv.height-(pts[i+1].y-ymin)*yscale-top);
    }
}

function draw_t_value() {
    ctx.fillStyle = 'black';
    ctx.font = 'bold 14pt Arial';
    ctx.textAlign = 'start';
    ctx.fillText('t = '+Math.round(plot.t*10)/10,
                 (canv.width-plot.width)/2+plot.width-80,
                 (canv.height-plot.height)/2+plot.height-10);
}

function redraw_margins() {
    ctx.fillStyle = 'white';
    //top
    ctx.fillRect(0,0,canv.width,(canv.height-plot.height)/2);
    //bottom
    ctx.fillRect(0,(canv.height-plot.height)/2+plot.height,canv.width,(canv.height-plot.height)/2);
    //left
    //ctx.fillRect(0,0,(canv.width-plot.width)/2,canv.height);
    //right
    //ctx.fillRect((canv.width-plot.width)/2+plot.width,0,(canv.width-plot.width)/2+plot.width,canv.height);
    //draw_plot_box();
}

function main() {
    clear_background();
    //draw_plot_box();
    draw_axes();
    draw_tick_marks();
    pts = compute_plot_points();
    draw_plot_points(pts,'blue');
    draw_t_value();
    redraw_margins();
}
