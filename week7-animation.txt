import numpy as np

tPoints = np.linspace(0,5,51).tolist() #create list of t values to test
framesReal = [] #initialize real frames list
framesComplex = [] #initialize complex frames list

#define function constants
a1 = 10
a2 = 5
b0 = 1
k = 2
w = -b0*k

#define window constraints
_xmin = 0
_xmax = 2*pi
_ymin = -12
_ymax = 12
aspect = (_xmax-_xmin)/(_ymax-_ymin)

#loop through all t values
for t in tPoints:
    #
    #create function graphics object
    fPlotReal = plot(a1*cos(k*x+w*t), _xmin, _xmax, ymin=_ymin, ymax=_ymax, aspect_ratio=aspect, legend_label='real part')
    fPlotComplex = plot(a1*sin(k*x+w*t), _xmin, _xmax, ymin=_ymin, ymax=_ymax, aspect_ratio=aspect, color='green', legend_label='complex part')
    fPlotReal.set_legend_options(loc='upper right')
    fPlotComplex.set_legend_options(loc='upper right')
    #
    #create t text label graphics object
    tLabel = text("t="+str(t), (_xmax,_ymin), horizontal_alignment='right', fontsize='large')
    #
    #append function and text label to frames list
    framesReal.append(fPlotReal+tLabel)
    framesComplex.append(fPlotComplex+tLabel)

#create animation of frames and display to console
real = animate(framesReal)
complex = animate(framesComplex)

#display both graphs
show(real+complex)
