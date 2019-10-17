window.onload = function() {
    canv = document.getElementById("gc");
    ctx = canv.getContext('2d');
    setup();
    const fps = 60;
    setInterval(main, 1000/fps);
}

function setup() {
    console.log("setup");
    let vars = $('input[type=range]');
    for(let item of vars) {
        let id_in = '#'+item.id,
            id_out = id_in.replace('input','output');
        $(id_out).text($(id_in).val()/10);
        $(id_in).on('input', () => {
            $(id_out).text($(id_in).val()/10);
        });
    }

    plot = {
        width: canv.width*0.9,
        height: canv.height*0.9
    };
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

function draw() {
    clear_background();
    draw_plot_box();
    draw_axes();
    draw_tick_marks();
}

function compute() {
    //pass
}

function main() {
    draw();
    compute();
}
