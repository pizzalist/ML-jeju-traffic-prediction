import numpy as np


def n_size_ndarray_creation(n, dtype=np.int):
    X = np.arange(n**2, dtype=dtype).reshape(-1, n)
    return X

def zero_or_one_or_empty_ndarray(shape, type, dtype=np.int):
    if type == 0:
        return np.zeros(shape,dtype)
    if type == 1:
        return np.ones(shape,dtype)
    if type == 99:
        return np.empty(shape,dtype)

def change_shape_of_ndarray(X, n_row):
    return X.reshape(n_row, -1)


def concat_ndarray(X_1, X_2, axis):
    try:
        return np.concatenate((X_1, X_2), axis)
    except:
        return False

def normalize_ndarray(X, axis=99, dtype=np.float32):
    if axis == 99:
        return (X - np.mean(X) / np.std(X))
    elif axis == 1: 
        n_row, n_col =  X.shape
        return (X - np.mean(X,axis=1).reshape(n_row,-1)) / np.std(X,axis=1).reshape(n_row,-1)
    elif axis == 0: 
        return (X - np.mean(X,axis=0).reshape(1,-1)) / np.std(X,axis=0).reshape(1,-1)


def save_ndarray(X, filename="test.npy"):
    np.save(filename, arr = X)


def boolean_index(X, condition):
    return np.where(eval(str("X") + condition))


def find_nearest_value(X, target_value):
    return X[np.argmin(abs(X - target_value))]

def get_n_largest_values(X, n):
    return np.sort(X)[::-1][:n]