import numpy as np
import sympy as sp
import matplotlib.pyplot as pl
from sympy.utilities.lambdify import lambdify
pl.show()
pl.ion()
pi = np.pi

x = sp.symbols('s')
nu = sp.symbols('nu')
t = sp.symbols('t')

phi = sp.exp(-(x - 4 * t) ** 2 / (4 * nu * (t+1))) + sp.exp(-(x - 4 * t - 2 * pi) ** 2 / (4 * nu * (t+1)))
phi_partialdiff = phi.diff(x)
#print(phi_partialdiff)

u_init = -2 * nu * (phi_partialdiff / phi) + 4
#print(u_init)

u = lambdify((t, x, nu), u_init)
#print(u(5, 6, 7))      #random variables for now

nx = 101    # amount of nodes in domain
nt = 100    # amount of time steps
dx = 2 * pi / (nx - 1)
nu = .07
dt = dx * nu    # change in time intervals
T = nt * dt     # total time

points_plotted = np.linspace(0, 2 * pi, nx)
t = 0

velocity = np.asarray([u(t, x, nu) for x in points_plotted])
#print(velocity)

# graphing the initial conditions
pl.figure(figsize=(11, 7), dpi=100)
pl.plot(points_plotted, velocity, marker='o')
pl.xlim([-2 * pi, 2 * pi])
pl.ylim([0, 10])
pl.xlabel('x')
pl.ylabel('Velocity')
pl.title('1D - Burger\'s Equation with Initial Conditions')

pl.grid()
pl.show(block=True)

#Creating the analytical solutions
un = np.empty(nx)
for x in range(nt):
    un = velocity.copy()
    for i in range(nx - 1):
        velocity[i] = velocity[i] - un[i] * dt/dx * (un[i]-un[i-1]) + nu * dt/(dx**2) * (un[i+1] - 2*un[i] + un[i-1])

    velocity[-1] = un[-1] - un[-1] * dt/dx * (un[-1]-un[-2]) + nu * dt/(dx**2) * (un[0] - 2*un[-1] + un[-2])

analytical_u = np.asarray(u(T, xi, nu) for xi in points_plotted)
pl.figure(figsize=(1, 7), dpi=100)
pl.plot(points_plotted, velocity, marker='o', lw=2, label='Computational')
pl.plot(points_plotted, velocity, label='Analytical')
pl.xlim([-2 * pi, 2 * pi])
pl.ylim([0, 10])
pl.legend()
pl.xlabel('x')
pl.ylabel('Velocity')
pl.title('1D Burger\'s Equation')

pl.grid()
pl.show(block=True)
