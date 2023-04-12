import numpy as np
import pandas as pd


def get_rating_matrix(filename, dtype=np.float32):
    df = pd.read_csv(filename)
    answer_df = df.groupby(["source", "target"]).agg({"rating" : "first"}).unstack().fillna(0)
    return answer_df.reset_index().drop("source",axis=1).values

def get_frequent_matrix(filename, dtype=np.float32):
    df = pd.read_csv(filename)
    return df.groupby(["source", "target"]).value_counts().unstack().values

# filename = "../movie_rating.csv"
# print(get_rating_matrix(filename))

filename = "../1000i.csv"
print(get_frequent_matrix(filename))