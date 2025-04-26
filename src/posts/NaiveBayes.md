---
tags:
  - MachineLearningTheory
  - Project
last_update: 2025-04-23
title: It's not bad being Naive (Bayes)
image: /images/naive-bayes-bg.png
description: Explaining the Naive Bayes  algorithm
link: https://github.com/aaronma300604/LearningMachineLearning

---

### General idea

Naive Bayes is a supervised machine learning algorithm based of Bayesian probability. 
It is used only for classification problems, not regression ones.
The algorithm works by calculating the probability that a certain example is from a certain class, given the values of some attributes.

### Training the algorithm

We start with a series of labeled examples, with the same attributes but different values for them. From here, we calculate the probability of each class, and the conditional probability of each value for each attribute, given it belongs to the labeled class. Mathematically, we calculate:

$$
\begin{array}{ll}
\{P(y_1), P(y_2), ..., P(y_n)\}\ and\ \{P(X=x |y_1), P(X=x |y_2), ..., P(X=x|y_n\}
\\
\displaystyle P(X=x|y) = {{N_{X=x,y} } \over {N_y}} 
\\
\displaystyle P(y) = {{N_y} \over {N}} 
\end{array}

$$
,where $N$ is the number of examples, $|X|$  is the number of possible values of the attribute $X$ , $N_X=x,y$ is the number of examples belonging to class $y$ where the attribute $X$ has a value $x$  and $N_y$ is the number of examples in class $y$.
### Predicting with the algorithm

Once we have all the probabilities, we can predict the class of a new example we did not have in the training dataset. In order to do so, we calculate the probability for that example to belong to each class, and we predict the class with the higher probability.
To compute this probabilities, we multiply the probability of that class by the conditioned probabilities of each attribute having the value it has in the example we want to predict, given it belongs to the current class. In practice, we use logarithms in order to avoid underflow computational errors. Mathematically:

Given an example $E$, with attributes  $X_1,X_2,...,X_N$  each with respective values $x_1,x_2,x_N$ and classes  $y_1,y_2,...,y_N$:

$$
\begin{array}{ll}
P(E\in y_1) = log(\ P(y_1) \times P(X_1 = x_1|y_1) \times P(X_2 = x_2|y_1) \times ... \times P(X_N = x_N|y_1)\ )\\
P(E\in y_2) = log(\ P(y_2) \times P(X_1 = x_1|y_2) \times P(X_2 = x_2|y_2) \times ... \times P(X_N = x_N|y_2)\ ) \\
.\\
.\\
.\\
P(E\in y_N) = log(\ P(y_N) \times P(X_1 = x_1|y_N) \times P(X_2 = x_2|y_N) \times ... \times P(X_N = x_N|y_N)\ ) \\
\\
Y = max\{P(E\in y_1),P(E\in y_2),...,P(E\in y_N)\}
\end{array}
$$
### Laplace smoothing

In order to avoid probabilities going to zero when we do not have examples of an attribute value for a certain class, we use Laplace smoothing. In short, we add virtual examples to the actual ones while training. We add $k$ examples for each possible value in each attribute and class. We have to take in account this virtual examples in the denominator too. Mathematically:

$$
P(X=x|y) = {{N_{X=x,y} + k} \over {N_y +k|X|}}
$$
, where $|X|$  is the number of possible values of the attribute $X$ , $N_X=x,y$ is the number of examples belonging to class $y$ where the attribute $X$ has a value $x$  and $N_y$ is the number of examples in class $y$.

The exact formula for the smoothing can vary depending on the version of the algorithm we are using. For example, this one it is not exactly the same as in the bag of words model for Natural Processing Language.