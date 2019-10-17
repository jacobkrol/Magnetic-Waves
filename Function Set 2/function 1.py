from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator, FormatStrFormatter
import numpy as np


fig = plt.figure()
ax = fig.gca(projection='3d')

# Make data.
X0 = np.arange(0,6.28, 0.02)
X1 = X0
X0, X1 = np.meshgrid(X0, X1)
k = np.array([2,-1])
Z = np.sin(k[0]*X0 + k[1]*X1)

# Plot the surface.
surf = ax.plot_surface(X0, X1, Z, cmap=cm.coolwarm,
                       linewidth=0, antialiased=False)

# Customize the z axis.
ax.set_zlim(-1.01, 1.01)
ax.zaxis.set_major_locator(LinearLocator(10))
ax.zaxis.set_major_formatter(FormatStrFormatter('%.02f'))

# Add axis labels
ax.set_xlabel('x0 axis')
ax.set_ylabel('x1 axis')
ax.set_zlabel('f(k,x) axis')

plt.show()
