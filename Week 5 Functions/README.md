# Week 5 Functions

## Target Functions

1. *f*(*x*) = *sin*(**k** &sdot; **x**)

*where* **k**, **x** are vectors \<k<sub>0</sub>, k<sub>1</sub>\>, \<x<sub>0</sub>, x<sub>1</sub>\>, and **k** is constant.

2. *f*(*x*) = e<sup>*i*__k__**x**</sup> = *cos*(**k** &sdot; **x**) + *isin*(**k** &sdot; **x**)

*where* **k**, **x** are vectors \<k<sub>0</sub>, k<sub>1</sub>\>, \<x<sub>0</sub>, x<sub>1</sub>\>, and **k** is constant.

3. *f*(*x*, *t*) = *sin*(*kx* + *wt*)

*where* constants k, w &isin; &#8477;, and also independent variables x, t &isin; &#8477;

a. Plot the given function in the 3D plane, with axes *x*, *t*, and *f*

b. Plot the given function in the 2D plane, with the third dimension presented over time

## Notes

`function 1.py` is built on top of a demo of 3D plotting from the [matplotlib website](https://matplotlib.org/mpl-toolkits/mplot3d/tutorial.html). We adapted the independent variable ranges to be equivalent contributing components of a 2D x-variable vector and replaced the z-axis function with the function 1 expressed above. We additionally removed the colorscale and added axes labels.

`function 3a.py` is built on top of a demo of 3D plotting from the [matplotlib website](https://matplotlib.org/mpl-toolkits/mplot3d/tutorial.html). We adapted the demo in the same way as previously stated in `function 1.py`.

`function 3b.py` is now deprecated, only maintained for highlighting. This program has code only functional in Sage Math, a language built on top of Python.

`function 3b.txt` can be run by copying it to a `.sws` or sage worksheet. This can be achieved by downloading the program from the [Sage Math website](https://sagemath.org), or on the online editor [CoCalc](https://cocalc.com/app).
