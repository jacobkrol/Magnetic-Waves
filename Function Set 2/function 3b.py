import numpy as np

tPoints = np.linspace(0,5,51).tolist() #create list of t values to test
frames = [] #initialize frames list

#define function constants
k = 1
w = 2

#define window constraints
_xmin = 0
_xmax = 2*pi
_ymin = -1.5
_ymax = 1.5
aspect = (_xmax-_xmin)/(_ymax-_ymin)

#loop through all t values
for t in tPoints:
    
    #create function graphics object
    fPlot = plot(sin(k*x+w*t), _xmin, _xmax, ymin=_ymin, ymax=_ymax, aspect_ratio=aspect)
    
    #create t text label graphics object
    tLabel = text("t="+str(t), (_xmax,_ymin), horizontal_alignment='right', fontsize='large')
    
    #append function and text label to frames list
    frames.append(fPlot+tLabel)

#create animation of frames and display to console
animate(frames).show()