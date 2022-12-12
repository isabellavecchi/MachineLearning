# -*- coding: utf-8 -*-
"""Trab6_Adaline.ipynb
**Aluna**: Isabella Vecchi Ferreira
**Matrícula**: 11621ECP002
"""

import numpy as np
import pandas as pd

"""Lendo o Arquivo xlxs"""
df = pd.read_excel('Basedados_B2.xlsx')
print("Column headings:")

"""Passo 0:"""
Sij = np.column_stack((df['s1'],df['s2']))

limite_i = len(Sij)     #linhas
limite_j = len(Sij[0])  #colunas
limite_k = 1            #qte de array(s) de neuronios
tki = np.zeros((limite_k,limite_i))
tki[0] = df['t']

wkj = np.random.rand(limite_k,limite_j) * (-0.5-0.5) + 0.5
bias = np.zeros(limite_k)
np.set_printoptions(precision=3)
#print(wkj)

teta = 0 #limiar
alfa = 0.003 #taxa de aprendizagem
erroTolerancia = 0.05
ciclos = 0

yki = np.zeros((limite_k,limite_i))

"""PROGRAMA

"""

#PASSO 1
ciclos=np.zeros(limite_i+1)
for i in range(limite_i):
  erroQuadratico = 1
  #flTrocou = True
  while(erroQuadratico > erroTolerancia):
    erroQuadratico = 0
    ciclos[i]+=1
    ciclos[limite_i]+=1

    #PASSO 2
    #PASSO 3
    Xij = Sij
    #flTrocou = False

    #PASSO 4
    for k in range(limite_k):
      yLiquido = 0
      #Multiplicando a matriz de entradas pela matriz tranposta dos pesos e futuramente somando com os bias para obter y
      yLiquido = wkj.dot(Xij.transpose()) + bias[k]
      #Setando o valor de Y para 1 ou -1 de acordo com teta
      if yLiquido[k,i] >= teta:
        yki[k,i] = 1
      else:
        yki[k,i] = -1
    print("y")
    print(yki)

    #PASSO 5
    #Conferindo a saída e realizando mudança de pesos
    for k in range(limite_k):

      if yki[k,i] != tki[k,i]:
        #print("trocou")
        erro = tki[k,i] - yLiquido[k,i]

        #print("bias anterior")
        #print(bias)
        bias[k] = bias[k] + alfa*erro
        #print("bias novo")
        #print(bias)
        
        #print("pesos anteriores")
        #print(wkj)
        for j in range(limite_k):
          wkj[k,j] += alfa * erro * Xij[i,j]
        #print("pesos novos")
        #print(wkj)
        erroQuadratico += (erro * erro)/2
    string = "entrada[{}]: ciclos:{} \t-\tciclos totais: {}\terro: {}"
    print(string.format(i,ciclos[i],ciclos[limite_i],erroQuadratico))

  #yLiquido = entrada.dot(pesos.transpose())
  #yLiquido = yLiquido+bias
  print("\nValores Finais: \n")
  print("pesos")
  print(wkj)
  print("bias")
  print(bias)
  print("y liquido")
  print(yLiquido)
  print("y")
  print(yki)
print()
string = "ciclos"
print(ciclos)
print("y")
print(yki)
print("t")
print(tki)


