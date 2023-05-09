import numpy as np


class LinearRegression(object):
    def __init__(self, fit_intercept=True, copy_X=True):
        self.fit_intercept = fit_intercept
        self.copy_X = copy_X

        self._coef = None
        self._intercept = None
        self._new_X = None
        self._w_hat = None

    def fit(self, X, y):
        self._new_X = X
        if self.fit_intercept == True:
            ones = np.ones((len(X), 1))
            X = np.hstack((ones,X))
        self._w_hat = (np.linalg.inv(X.T @ X) @ X.T) @ y 
        self._coef = self._w_hat[1:]
        self._intercept = self._w_hat[0]
        return self
        # return np.linalg.inv(X.T.dot(X)).dot(X.T).dot(y) 

    def predict(self, X):
        if self.fit_intercept == True:
            ones = np.ones((len(X), 1))
            X = np.hstack((ones,X))
        y_hat = X.dot(self._w_hat)
        return y_hat
    @property
    def coef(self):
        return self._coef

    @property
    def intercept(self):
        return self._intercept
