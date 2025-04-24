---
tags:
  - MachineLearningTheory
created: 2025-04-23
title: Neural Networks, an universal function approximator
image: /images/neural-networks-bg2.png
---
### General Idea

Neural networks are universal function approximators, based on iteratively minimizing a cost function. To do so, we use an algorithm called [[#Backpropagation|backpropagation]] , which makes use of the cost function gradient to tweak weights and biases in order to approach it's minimum. 

Neural networks connect artificial neurons (also called perceptrons) in a layer distribution. Each connection between neurons has a weight. [[#Notes|Biases]] are added to each neuron to help with problem resolution. We use these to calculate an output for each neuron, which is later [[#Notes|"activated"]] and passed to the next layer.

Neural networks have 3 types of layers: input layers, output layers and hidden layers. In the input layer, neurons just take an input and send them to the next layer. Hidden layers take the output of the previous layer and use them as inputs. The output layer works the same way as a hidden layer, but it's output is the final output of the network. Because of this, they often have a different [[#Some activation functions|activation function]].

![[Neural Networks 2025-04-23 17.13.25.excalidraw|800]]

### Notation
Let's define some mathematical notation to keep things clear:

- $z$ refers to the pre-activated output of a neuron
- $a$ refers to the activated output of a neuron
-  $x_i$ refers to the $i$ input to the neuron
- $w_i$ refers to the $i$ weight of a neuron
- $L$ refers to the last layer of a network and $l$, to an arbitrary layer
- $g^l$ refers to the activation function of the layer $l$
- $Z^l,A^l,X^l,W^l \ and \ W^l_0$ refer to the matrices of the outputs, inputs, weights and biases of a layer, respectively.
- $\Delta^l$ refers to the loss of the layer $l$, $\Delta^l_i$ refers to the loss of the neuron $i$ of the layer $l$
- $C$ refers to the loss functions

### Backpropagation

Backpropagation leverages the stochastic gradient descent algorithm and matrices multiplications to  train neural networks by adjusting their weights and biases. Each neuron has a weight for each of its inputs, plus and extra one we call bias. In order to backpropagate errors, we first need to do a forward pass through the network. The algorithm goes as follows:

1. Initialize weight and biases at random
2. Each epoch
	1. For each input example:
		1. Do a forward pass
		2. Calculate the loss the network had in the forward pass
		3. Use derivatives to propagate the loss backwards.
		4. Calculate derivative of the loss function relative to each weight 
		5. Update weights ans biases

#### The forward pass
In each neuron of each hidden and output layer:
$$
z = \sum_{i=1}^nw_i*x_i +w_0
$$
$$
a = g^l(z)
$$
where $g^l(z)$ is the activation function for the layer $l$. This can vary between layers, but the most common layout is using ReLU in the hidden layers and another function in the output layer, this depending on the objective of the network.
##### Some activation functions

- Rectified Linear Unit (ReLU): 
  $$
  ReLU(z) = max(0,z) = \begin{cases} 0 & if & z\leq0 \\ z & if & z>0\end{cases}
  $$
- Hyperbolic tangent (tanh):
  $$
  tanh(z) = {{e^z-e^{-z}}\over{e^z+e^{-z}}}
  $$
- Sigmoid ($\sigma$) :
  $$
  \sigma(z) = {1\over{1+e^{-z}}}
  $$
- Softmax:
  $$
  softmax(Z) = {e^{z_i}\over{\sum_{j=1}^{|Z|}} e^{z_j}} 
  $$
#### The loss function

To calculate the error the network had in the forward pass, we need: the output of the network, the expected output for the data that was input to the neuron and a loss function.

The former two are easy to get and the lost function is predefined.

Once we have these three things, we can define the loss of each layer as:

$$

\begin{array}{l}
\Delta^L = \nabla_{a^L}C \odot (g^L)'(Z^L) \\
\Delta^l = \left[ (W^l + 1)^T \Delta^{l+1} \right] \odot (g^l)'(Z^l)
\end{array}


$$

##### Some loss functions

- Mean squared error (MSE):
  Used in multi-output regression
  $$
  MSE = {1\over n}\sum_{k=1}^n(y_k-a_k^L)^2, \text{where n is the number of neurons in the output layer}
  $$
- Binary cross entropy (BCE):
  Used in binary classification
  $$
  BCE = -yln(a^L)-(1-y)ln(1-a^L)
  $$
- Categorical cross entropy (CCE):
  Used in multiclass classification
  $$
  CCE = -\sum_{k=1}^ny_kln(a_k^L)
  $$
#### The derivatives

Now we need to calculate the partial derivative of the cost function relative to each weight. Luckily, we can compute these as:
$$
{\partial C \over {\partial w^l_{j\leftarrow k}}}= a^{l-1}_k\Delta^l_j
$$
where $j$ represents the neuron of the layer $l$ to which the weight comes and  $k$ represents the neuron of the layer $l-1$ from which the weight comes. For example, $w^2_{1\leftarrow 3}$ would represent this weight:

![[Neural Networks 2025-04-23 19.11.57.excalidraw|600]]

#### The update
For each example, we calculate:

$$
\begin{array}{}
\displaystyle {{\partial C \over {\partial W^1_0}}, {\partial C \over {\partial W^2_0}},...,{\partial C \over {\partial W^L_0}}} \\
\displaystyle {{\partial C \over {\partial W^1}}, {\partial C \over {\partial W^2}},...,{\partial C \over {\partial W^L}}} 
\end{array}
$$
Each of these represent a matrix with all the partial derivatives respect the corresponding weights or biases.
Once we have these:

$$
W^l \leftarrow W^l - {\eta \over |\mathcal{B}|} \sum_{i=0}^{|\mathcal{B}|}{\partial C \over {\partial {W^l}^i}}
$$
where $|\mathcal{B}|$ represents the number of examples in the [[#Notes|minibatch]]. 

Once we have done all this for each example, we've completed an epoch. We just must repeat for whatever epochs we want (the more epochs, the closer to the minimum of the loss function, but the more risk of overfitting).

### Predicting neural networks

Once trained, we only need to provide an example to the neural network. It will process the examples like it did in the forward passes, but with adjusted weights and biases. Then, we just need to interpret the output of the network (normally, as a distribution probability in classification and as a value in regression).

### Notes

 - In practice, we use minibatches to train the network. This means we don't update the weights for each single example. Instead, we group them in batches. This is significantly more efficient, and works surprisingly well. This is why we call the algorithm "stochastic" gradient decent. 
 - In it's simplest form, neural networks learn linear bounds to the data. Without the bias, these bounds would always have their origin ordinate in the origin of coordinates, which will make impossible for neural networks to solve most problems.
	![[Neural Networks 2025-04-23 20.25.17.excalidraw]] 
- Without activation function, neural networks could only predict linear bounds, since all the calculations we do in order to get $z$ are multiplications and additions. Activation functions such as ReLU add the needed non-linearity, which actually transform neural networks into universal function approximators ![[Neural Networks 2025-04-23 20.35.00.excalidraw]]
