from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator, FormatStrFormatter
import numpy as np


fig = plt.figure()
ax = fig.gca(projection='3d')

# Make data.
X = np.arange(0,6.28, 0.1)
T = np.arange(0,5,0.1)
X, T = np.meshgrid(X, T)
k = 5
w = 5
Z = np.sin(k*X + w*T)

# Plot the surface.
surf = ax.plot_surface(X, T, Z, cmap=cm.coolwarm,
                       linewidth=0, antialiased=False)

# Customize the z axis.
ax.set_zlim(-1.01, 1.01)
ax.zaxis.set_major_locator(LinearLocator(10))
ax.zaxis.set_major_formatter(FormatStrFormatter('%.02f'))

# Add axis labels
ax.set_xlabel('x axis')
ax.set_ylabel('t axis')
ax.set_zlabel('f(t,x) axis')

plt.show()
