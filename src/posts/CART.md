---
tags:
  - MachineLearningTheory
image: /images/cart-bg.png
title: Classification and regression trees to grow a forest
description: A explanation about the CART algorithm 
created: 2025-04-23
link: https://github.com/aaronma300604/LearningMachineLearning
---

### General idea

CART creates a tree based of thresholds  between attribute values.  Once this tree is built, predicting a class (classification) or value (regression) is trivial, you only need to follow the tree nodes. 

### Training the algorithm 

The CART algorithm tries to learn the optimum thresholds which distinguish the data. In order to do so, we need to:

- Calculate all possible thresholds.
- For each threshold:
	-  Divide the data in below and above the threshold
	- Calculate a [[#How to calculate impurity|impurity]] measure for the division
	- Choose the threshold whose division has the lowest impurity
- Repeat for each new branch until you reach impurity 0 or a predefined maximum depth.  

##### How to calculate impurity

For classification, the standard for calculating impurity is the Gini coefficient. For each branch:
$$
G = 1-\sum_{i=1}^N\hat{\pi}_i^2
$$
,where $\hat{\pi}$ is the proportion of examples of each class and $N$ is the total number of examples.
This has the property that is only 0 when all the examples in the branch have the same class.

For regression, we use the variance:
$$
Var(X) = {{1}\over{|X|}}\sum_{i=1}^{|X|}(x_i-\overset{-}{x})^2 
$$
,where $\overset{-}{x}$ is the mean of the objective values, $x_i$ is the objective values for example $i$ and $|X|$ is the number of examples.

With the corresponding of this measures, we can calculate the impurity of a division by:
$$
I = {1\over N_1}\times G_1 + {1\over N_2}\times G_2 +\ ...\ +{1\over N_m}\times G_m 
$$
for classification trees, or
$$
I = {1\over N_1}\times Var_1 + {1\over N_2}\times Var_2 +\ ...\ +{1\over N_m}\times Var_m 
$$
for regression trees.

### Predicting with the algorithm

Predicting with CART is easy. You just need to follow the tree. 

![[ExampleCART.excalidraw | 800]]

Let's say we have an example whose $X_1$ and $X_2$ attributes are respectively, below and over the threshold the algorithm defined for them in the levels 0 and 1. To classify the example, we follow the tree, so we go left in level 0, right in level 1 and we classify the example as the most common class in the leaf or, in regression, we assign the value of the mean of objectives values in the leaf's example. 

### Considerations

While doing regression, is mandatory to set a maximum depth to the tree, else the leafs will only have a single example in them. In practice, is also usual to set a minimum leaf size in order to keep dividing it, to avoid over-fitting. In general, the deeper the tree is, the more possible is for the algorithm to over-fit the data.


