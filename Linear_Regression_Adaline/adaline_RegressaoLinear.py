# -*- coding: utf-8 -*-
"""Trab6_Adaline.ipynb
**Aluna**: Isabella Vecchi Ferreira
**Matrícula**: 11621ECP002
"""

import numpy as np
import matplotlib.pyplot as plt

"""gerando as entradas e saídas"""


limite_i = 80          #linhas
limite_j = 1            #colunas
limite_k = 1            #qte de array(s) de neuronios

incerteza = 2

x = np.linspace(0, 200, limite_i)
x += ( np.random.random((limite_i,)) * (-2*incerteza) + incerteza )
y = lambda x : x + 1 + ( np.random.random((limite_i,)) * (-2*incerteza) + incerteza )
print(x,y(x))


'''APRENDIZAGEM DE MÁQUINA'''

"""Passo 0:"""
Sij = np.zeros((limite_i,limite_j))
for i in range(len(x)):
  Sij[i,0] = x[i]
      
print("entrada")
print(Sij)

tki = np.zeros((limite_k,limite_i))
tki[0] = y(x)
print("T")
print(tki)
#tki = tki.transpose()

wkj = np.random.rand(limite_k,limite_j) * (-0.5-0.5) + 0.5
bias = np.zeros(limite_k)
np.set_printoptions(precision=3)
print("pesos")
print(wkj)


teta = 0 #limiar
alfa = 0.00005 #taxa de aprendizagem
erroTolerancia = 0.1
ciclos = 0

yki = np.zeros((limite_k,limite_i))

"""PROGRAMA

"""

#PASSO 1
ciclos=np.zeros(limite_i+1)
for i in range(limite_i):
  erroQuadratico = erroTolerancia + 1
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
      #Multiplicando a matriz de entradas pela matriz tranposta dos pesos e futuramente somando com os bias para obter y
      yki[k] = wkj.dot(Xij.transpose()) + bias[k]
    print("y")
    print(yki)

    #PASSO 5
    #Conferindo a saída e realizando mudança de pesos
    for k in range(limite_k):

      if yki[k,i] != tki[k,i]:
        #print("trocou")
        erro = tki[k,i] - yki[k,i]

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
  print("y")
  print(yki)
print()
print("ciclos totais:")
print(ciclos[limite_i])
print("erro")
print(erroQuadratico)
print("y")
print(yki)
print("t")
print(tki)



'''REGRESSÃO LINEAR'''

ySoma = 0
ySoma2 = 0
xSoma = 0
xSoma2 = 0
yMedia = 0
xySoma = 0
deltaY2 = 0
deltaYM2 = 0
n = limite_i


Xij = Sij
for i in range(limite_i):
  for k in range(limite_k):
    ySoma += yki[k,i]
    ySoma2 += yki[k,i]*yki[k,i]
    deltaYM2 += (yki[k,i] - (ySoma/(i+1)))**2
    
    for j in range(limite_j):
      xySoma += Xij[i,j]*yki[k,i]
      xSoma += Xij[i,j]
      xSoma2 += Xij[i,j]*Xij[i,j]
      #wkj[k,j] += alfa * erroQuadratico * Xij[i,j]
    #print("pesos novos")
    #print(wkj)
  #yki = entrada.dot(pesos.transpose())
  #yki = yki+bias
  print("\nValores Finais: \n")
  print("pesos")
  print(wkj)
  print("bias")
  print(bias)
  print("y")
  print(yki)
print()
string = "ciclos"
print(ciclos)

b = (n*xySoma - xSoma*ySoma)/(n*xSoma2 - xSoma**2)
a = ySoma/(limite_i) - b*xSoma/(limite_i)

print("coeficiente linear")
print(a)
print(bias)
print("coeficiente angular")
print(b)
print(wkj)


'''PLOTANDO O GRÁFICO'''

plt.scatter(Sij,tki, zorder=1,s=25)
x = np.linspace(0, 200, limite_i)
f = lambda x : wkj[0,0]*x + bias[0]
plt.plot(x, f(x), label="reta aproximada", zorder=2, color='black', linewidth=2)
plt.legend()
plt.show()
