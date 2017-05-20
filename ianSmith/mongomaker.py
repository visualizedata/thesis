import numpy as np
import pandas as pd
import pymongo
import json

#df = pd.read_json("vizdata.json", orient='index')
df = pd.read_json("fullvizdata.json", orient='index')
mc = pd.read_csv("majorCodes.txt")
mclist=mc.values.tolist()

from pymongo import MongoClient
client = MongoClient()


def dict_constructor(keys):
	mdict = {}
	for k in keys:
		#print(key[0])
		def masker(ls):
			maskls = []
			for i in ls:
				maskls.append( str(i[:2]) == str(k[0]))
            #maskls.append(any([str(i[:2]) == str(key[0]) for i in ls]))
			return any(maskls)

		df['codeMask'+str(k[0])] = df['codes'].apply(masker)
		#mdict["Collection"+str(k[0])] = []
		#mdict["Collection"+str(k[0])].append(True)
		#print(type(mdict["Collection"+str(k[0])][0]))
		#if(df['codeMask'+str(k[0])

		#mdict["Collection"+str(k[0])].append(df[df['codeMask'+str(k[0])][0] == np.True_])
		#print(df.iloc[1].to_json(orient="index"))
		mdict["Collection"+str(k[0])] = df[df['codeMask'+str(k[0])] == np.True_].to_json(orient="records")
	return mdict

major_dict = dict_constructor(mclist)
print(major_dict)

#converts dict to panel ... panel does not have .to_json functionality xD
#
#----------vvvv
#pn = pd.Panel.from_dict(major_dict)

#for n in mclist:
	#pn['Collection'+str(n[0])].dropna(axis=0,how="all", inplace="True")

#print(pn.Collection15)

#----------^^^^


#print(pn)#.iloc[4])
#pn = pd.Panel.from_dict(major_dict)
#print(pn.Collection13.to_json(orient="index"))

#df['code_mask'] = df['codes'].apply(masker)
#df[df['code_mask'].apply(any)]


#major_dict = {}
#for i in mc:
    #major_dict[i] = df[df['codes'].apply(lambda x: [el[:2] for el in x]) == i]

#print(major_dict.Collection13)
