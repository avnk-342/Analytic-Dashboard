import pandas as pd

data = pd.read_csv("./csvjson.csv")

print(data.info())
df2 = data.dropna()
print(df2.info())
print(data.shape[0],"----",df2.shape[0])