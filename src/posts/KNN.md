---
tags:
  - MachineLearningTheory
  - Project
technologies:
  - Python
  - JupyterNotebook
last_update: 2025-04-20
title: KNN, a proximity sensor
image: /images/knn-bg.png
description: Explaining the K nearest neighbors algorithm
link: https://github.com/aaronma300604/LearningMachineLearning
---

### General idea

This algorithms does not learn any parameters. Instead, it uses the training data to calculate distances with the examples we want to predict, and classifies this examples as the predominant class of the $k$ closest neighbors, hence the name. $k$ is an hyperparameter that needs to be predefined. In regression, we predict the mean of the objective values of the $k$ nearest neighbors.

### Preparing the data

Since it does not learn any parameters, this algorithm requires no training, at the cost of a significantly longer computation time for each prediction.

However, in order to get correct predictions, we need to normalize all the data in the training set to a common range. This is necessary because the data can be in different ranges, which will result in some attributes having a greater weight than others in the calculation of distances. 

For example, in a dataset we could have an attribute measuring the toughness in the Mohs scale (range 1-10) and another measuring the temperature of the fusion point in K (range 273 -3693). In this case, the fusion point would have a much larger impact int the distance calculation than the toughness, which would be negligible.

Normally, we normalize data to a range between 0 and 1 or to a normal distribution with mean 0 and variance 1. 

- Normalizing to range 0-1:
$$
x_n = {{x-min} \over {max-min}}
$$
- Normalizing to mean 0, variance 1:
$$
x_n = {{x-\mu} \over {\sigma}}
$$
where $min$ and $max$ refer to the attributes $min$ and $max$ and $\mu$ and $\sigma$ refer to their mean and variance, respectively.

### Predicting with the algorithm

Prediction is easy: we calculate the distance between the example we want to predict and each example of the training data, and we choose the $k$ closest ones. It's important to normalize the example using the same $max$ and $min$ (or $\mu$ and $\sigma$ ) that we use for the training data. This could lead to the example having normalized values out of the normalized range or distribution, but this is no problem (actually, it is the desired behavior, since it keeps the distances meaningful).

From there, we either classify the example through majority voting (in classification) or we calculate the mean of the objective values and predict that (in regression). We have different measures for the distance:

- Euclidean distance:
$$
d(e1,e2) = \sum_{i=1}^n\sqrt{(x_{i,1} -x_{i,2} )^2}
$$

- Manhattan distance:
$$
d(e1,e2) = \sum_{i=1}^n|x_{i,1}-x_{i,2}|
$$
- Hamming distance:
$$
d(e1,e2) = \sum_{i=1}^n x_{i,1} \oplus x_{i,2}
$$
- Cosine similitude:
$$
\text{sim}(\vec{e1}, \vec{e2}) = \frac{\vec{e1} \cdot \vec{e2}}{\|\vec{e1}\| \cdot \|\vec{e2}\|}
$$
where $x_{i,j}$ represents the value for the attribute $i$ in the example $j$ and $\oplus$ is the XOR operation, which only returns $1$ when both operands are different .

Euclidean and Manhattan distances can be used with numeric data, Hamming distance is used when the data is described only by categorical features and cosine similitude can be used when the examples are represented as vectors (for example, with a tf-idf codification in the context of Natural Language Processing). When using cosine similitude, we have to take in account we need to choose the most similar (the biggest number, as opposite as when using distances).