# Kumpulan Kode Machine Learning (ML.html)

Dokumen ini berisi seluruh kode Python yang diekstrak dari berkas notebook `ML.html`. Kode telah dirapikan agar tidak terpotong dan mudah disalin (*copy-paste*), baik per sel (*cell*) maupun keseluruhan.

---

## 1. Linear Regression (Scikit-Learn)

### Cell 1: Import Library
```python
from sklearn.linear_model import LinearRegression  # Import the linear regression model
import matplotlib.pyplot as plt  # The plotting library
import numpy as np
```

### Cell 2: Menyiapkan Data & Visualisasi Scatter Plot
```python
x = np.array([121, 125, 131, 141, 152, 161]).reshape(-1, 1)  # x denotes the house area as a feature.
y = np.array([300, 350, 425, 405, 496, 517])                  # y denotes the house price.

plt.scatter(x, y)
plt.xlabel("area")   # X axis indicates the area.
plt.ylabel("price")  # Y axis indicates the price.
plt.show()
```

### Cell 3: Pelatihan Model (Fit)
```python
lr = LinearRegression()  # Encapsulate the linear regression model into an object.
lr.fit(x, y)             # Train the model on the dataset.
```

### Cell 4: Parameter Model (Slope & Intercept)
```python
w = lr.coef_         # Slope of the model
b = lr.intercept_    # Intercept of the model

print('Slope: ', w)
print('Intercept: ', b)
```

### Cell 5: Prediksi Data Baru
```python
testX = np.array([[130]])  # A test sample with an area of 130
prediction = lr.predict(testX)
print("Hasil prediksi untuk area 130:", prediction)
```

---

## 2. Linear Regression Implementation (Expansion Experiment - Gradient Descent Manual)

### Cell 6: Import Library
```python
import numpy as np
import matplotlib.pyplot as plt
```

### Cell 7: Fungsi Perhitungan Gradien
```python
def generate_gradient(X, theta, y):
    sample_count = X.shape[0]
    # Calculate the gradient based on the matrix: 1/m ∑(((h(x^i)-y^i)) x_j^i)
    return (1.0 / sample_count) * X.T.dot(X.dot(theta) - y)
```

### Cell 8: Fungsi Membaca Data Training
```python
def get_training_data(file_path):
    orig_data = np.loadtxt(file_path, skiprows=1)  # Ignore the title in the first row of the dataset.
    cols = orig_data.shape[1]
    return (orig_data, orig_data[:, :cols - 1], orig_data[:, cols - 1:])
```

### Cell 9: Fungsi Inisialisasi Parameter Theta ($\theta$)
```python
# Initialize the θ array.
def init_theta(feature_count):
    return np.ones(feature_count).reshape(feature_count, 1)
```

### Cell 10: Algoritma Gradient Descent
```python
def gradient_descending(X, y, theta, alpha):
    Jthetas = []  # Record the change trend of the cost function J(θ) to confirm the gradient descent is correct.
    
    # Calculate the loss function: (y^i - h(x^i))^2
    Jtheta = (X.dot(theta) - y).T.dot(X.dot(theta) - y)
    index = 0
    gradient = generate_gradient(X, theta, y)  # Calculate the gradient.
    
    while not np.all(np.absolute(gradient) <= 1e-5):  # End calculation when gradient is <= 0.00001
        theta = theta - alpha * gradient
        gradient = generate_gradient(X, theta, y)  # Calculate the new gradient.
        
        # Calculate loss function again
        Jtheta = (X.dot(theta) - y).T.dot(X.dot(theta) - y)
        if (index + 1) % 10 == 0:
            Jthetas.append((index, Jtheta[0]))  # Record result every 10 iterations.
        index += 1
        
    return theta, Jthetas
```

### Cell 11: Plot Kurva Fungsi Rugi (*Loss Function*)
```python
# Plot the loss function change curve.
def showJTheta(diff_value):
    p_x = []
    p_y = []
    for (index, val_sum) in diff_value:
        p_x.append(index)
        p_y.append(val_sum)
        
    plt.plot(p_x, p_y, color='b')
    plt.xlabel('steps')
    plt.ylabel('loss function')
    plt.title('step - loss function curve')
    plt.show()
```

### Cell 12: Plot Data Aktual dan Garis Regresi
```python
# Plot the actual data points and the fitted curve.
def showlinercurve(theta, sample_training_set):
    x, y = sample_training_set[:, 1], sample_training_set[:, 2]
    z = theta[0] + theta[1] * x
    
    plt.scatter(x, y, color='b', marker='x', label="sample data")
    plt.plot(x, z, 'r', color="r", label="regression curve")
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('linear regression curve')
    plt.legend()
    plt.show()
```

### Cell 13: Eksekusi Gradient Descent
> **Catatan:** Pastikan berkas `./ML/02/lr2_data.txt` tersedia di direktori kerja Anda.

```python
# Read the dataset.
training_data_include_y, training_x, y = get_training_data("./ML/02/lr2_data.txt")

# Obtain the numbers of samples and features, respectively.
sample_count, feature_count = training_x.shape

# Define the learning step α.
alpha = 0.01

# Initialize θ.
theta = init_theta(feature_count)

# Obtain the final parameter θ and cost.
result_theta, Jthetas = gradient_descending(training_x, y, theta, alpha)

# Display the parameters.
print("w:{}".format(result_theta[0][0]), "b:{}".format(result_theta[1][0]))
showJTheta(Jthetas)
showlinercurve(result_theta, training_data_include_y)
```

---

## 3. Logistic Regression

### Cell 14: Import Library
```python
# Import StandardScaler from sklearn.preprocessing.
from sklearn.preprocessing import StandardScaler

# Import LogisticRegression from sklearn.linear_model.
from sklearn.linear_model import LogisticRegression
```

### Cell 15: Dataset Sewa Kamar
```python
# Each item in X denotes the rent and area.
# y indicates whether to rent the room (0: no; 1: yes).
X = [
    [2200, 15], [2750, 20], [5000, 40], [4000, 20], [3300, 20], [2000, 10], [2500, 12], [12000, 80],
    [2880, 10], [2300, 15], [1500, 10], [3000, 8],  [2000, 14], [2000, 10], [2150, 8],  [3400, 20],
    [5000, 20], [4000, 10], [3300, 15], [2000, 12], [2500, 14], [10000, 100], [3150, 10],
    [2950, 15], [1500, 5],  [3000, 18], [8000, 12], [2220, 14], [6000, 100], [3050, 10]
]

y = [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0]
```

### Cell 16: Standarisasi Fitur
```python
ss = StandardScaler()
X_train = ss.fit_transform(X)
```

### Cell 17: Cek Hasil Standarisasi
```python
print(X_train)
```

### Cell 18: Pelatihan Model Logistic Regression
```python
# Use the fit method of LogisticRegression to train model parameters.
lr = LogisticRegression()
lr.fit(X_train, y)
```

### Cell 19: Prediksi & Probabilitas
```python
testX = [[2000, 8]]
X_test = ss.transform(testX)
print("Value to be predicted: ", X_test)

label = lr.predict(X_test)
print("predicted label = ", label)

# Output the predicted probability.
prob = lr.predict_proba(X_test)
print("probability = ", prob)
```

---

## 4. Decision Tree

### Cell 20: Import Library
```python
import pandas as pd
import numpy as np
from sklearn import tree
import pydotplus
```

### Cell 21: Fungsi Membuat Decision Tree
```python
# Generate a decision tree.
def createTree(trainingData):
    data = trainingData.iloc[:, :-1]   # Feature matrix
    labels = trainingData.iloc[:, -1]   # Labels
    trainedTree = tree.DecisionTreeClassifier(criterion="entropy")  # Decision tree classifier
    trainedTree.fit(data, labels)       # Train the model.
    return trainedTree
```

### Cell 22: Fungsi Ekspor Diagram Pohon ke PDF
```python
def showtree2pdf(trainedTree, finename):
    dot_data = tree.export_graphviz(trainedTree, out_file=None)  # Export the tree in Graphviz format.
    graph = pydotplus.graph_from_dot_data(dot_data)
    graph.write_pdf(finename)  # Save the tree diagram to the local machine in PDF format.
```

### Cell 23: Fungsi Encoding Data Kategorikal
```python
def data2vectoc(data):
    names = data.columns[:-1]
    for i in names:
        col = pd.Categorical(data[i])
        data[i] = col.codes
    return data
```

### Cell 24: Membaca Data & Melatih Pohon Keputusan
> **Catatan:** Pastikan berkas `./ML/tennis.txt` tersedia di direktori kerja Anda.

```python
data = pd.read_table("./ML/tennis.txt", header=None, sep='\t')  # Read training data.
trainingvec = data2vectoc(data)                                # Vectorize data.
decisionTree = createTree(trainingvec)                         # Create a decision tree.
showtree2pdf(decisionTree, "tennis.pdf")                       # Plot the decision tree.
```

### Cell 25: Prediksi Data Uji
```python
testVec = [0, 0, 1, 1]  # Weather is sunny, temperature is low, humidity is high, and wind is strong.
prediction = decisionTree.predict(np.array(testVec).reshape(1, -1))
print("Hasil prediksi Decision Tree:", prediction)
```

---

## 5. K-Means Algorithm Implementation

### Cell 26: Import Library
```python
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
```

### Cell 27: Pembuatan Titik Data Sintetis (Blobs)
```python
X, y = make_blobs(n_samples=500, n_features=2, centers=4, random_state=1)
```

### Cell 28: Dimensi Data
```python
print("Dimension of X is {}".format(X.shape))
print("Dimension of y is {}".format(y.shape))
```

### Cell 29: Visualisasi Titik Data Asli
```python
fig, ax1 = plt.subplots(1)
ax1.scatter(
    X[:, 0], X[:, 1],
    marker='o',  # Set the shape of the point to circle.
    s=8          # Set the size of the point.
)
plt.show()
```

### Cell 30: Visualisasi Titik Data Berdasarkan Ground Truth Label
```python
color = ["red", "pink", "orange", "green"]
fig, ax1 = plt.subplots(1)

for i in range(4):
    ax1.scatter(
        X[y == i, 0], X[y == i, 1],  # Draw the color based on the label.
        marker='o',                  # Set the shape of the point to circle.
        s=8,                         # Set the size of the point.
        c=color[i]
    )
plt.show()
```

### Cell 31: K-Means Clustering dengan $k = 3$
```python
n_clusters = 3
cluster1 = KMeans(n_clusters=n_clusters, random_state=3).fit(X)
```

### Cell 32: Label Klaster ($k=3$)
```python
y_pred1 = cluster1.labels_
print(y_pred1)
```

### Cell 33: Titik Pusat Klaster / Centroid ($k=3$)
```python
centroid1 = cluster1.cluster_centers_
print(centroid1)
```

### Cell 34: Visualisasi Hasil Klaster ($k=3$) & Centroid
```python
color = ["red", "pink", "orange", "gray"]

fig, ax1 = plt.subplots(1)

for i in range(n_clusters):
    ax1.scatter(
        X[y_pred1 == i, 0], X[y_pred1 == i, 1],
        marker='o',  # Set the shape of the point to circle.
        s=8,         # Set the size of the point.
        c=color[i]
    )
    
ax1.scatter(
    centroid1[:, 0], centroid1[:, 1],
    marker="x",
    s=15,
    c="black"
)
plt.show()
```

### Cell 35: K-Means Clustering dengan $k = 4$
```python
n_clusters = 4
cluster2 = KMeans(n_clusters=n_clusters, random_state=0).fit(X)
y_pred2 = cluster2.labels_
centroid2 = cluster2.cluster_centers_
print("Centroid: {}".format(centroid2))
```

### Cell 36: Visualisasi Hasil Klaster ($k=4$) & Centroid
```python
color = ["red", "pink", "orange", "green"]

fig, ax1 = plt.subplots(1)

for i in range(n_clusters):
    ax1.scatter(
        X[y_pred2 == i, 0], X[y_pred2 == i, 1],
        marker='o',  # Set the shape of the point to circle.
        s=8,         # Set the size of the point.
        c=color[i]
    )
    
ax1.scatter(
    centroid2[:, 0], centroid2[:, 1],
    marker="x",
    s=15,
    c="black"
)
plt.show()
```

---

## 6. Seluruh Kode dalam Satu Skrip Lengkap (Standalone Script)

Jika Anda ingin menjalankan seluruh notebook sekaligus, salin blok di bawah ini:

```python
# ==========================================
# 1. LINEAR REGRESSION (SKLEARN)
# ==========================================
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
import numpy as np

x = np.array([121, 125, 131, 141, 152, 161]).reshape(-1, 1)
y = np.array([300, 350, 425, 405, 496, 517])

plt.scatter(x, y)
plt.xlabel("area")
plt.ylabel("price")
plt.title("House Area vs Price")
plt.show()

lr = LinearRegression()
lr.fit(x, y)

w = lr.coef_
b = lr.intercept_
print('Slope: ', w)
print('Intercept: ', b)

testX = np.array([[130]])
print("Prediction for 130:", lr.predict(testX))

# ==========================================
# 2. LOGISTIC REGRESSION
# ==========================================
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression

X = [
    [2200, 15], [2750, 20], [5000, 40], [4000, 20], [3300, 20], [2000, 10], [2500, 12], [12000, 80],
    [2880, 10], [2300, 15], [1500, 10], [3000, 8],  [2000, 14], [2000, 10], [2150, 8],  [3400, 20],
    [5000, 20], [4000, 10], [3300, 15], [2000, 12], [2500, 14], [10000, 100], [3150, 10],
    [2950, 15], [1500, 5],  [3000, 18], [8000, 12], [2220, 14], [6000, 100], [3050, 10]
]
y_log = [1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0]

ss = StandardScaler()
X_train = ss.fit_transform(X)

lr_clf = LogisticRegression()
lr_clf.fit(X_train, y_log)

testX = [[2000, 8]]
X_test = ss.transform(testX)
print("Test sample standardized:", X_test)
print("Predicted label:", lr_clf.predict(X_test))
print("Predicted probability:", lr_clf.predict_proba(X_test))

# ==========================================
# 3. K-MEANS CLUSTERING
# ==========================================
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

X_blob, y_blob = make_blobs(n_samples=500, n_features=2, centers=4, random_state=1)

# k = 4 Clustering
kmeans_4 = KMeans(n_clusters=4, random_state=0).fit(X_blob)
labels_4 = kmeans_4.labels_
centers_4 = kmeans_4.cluster_centers_

colors = ["red", "pink", "orange", "green"]
fig, ax = plt.subplots()
for i in range(4):
    ax.scatter(X_blob[labels_4 == i, 0], X_blob[labels_4 == i, 1], s=8, c=colors[i])
ax.scatter(centers_4[:, 0], centers_4[:, 1], marker="x", s=30, c="black", label="Centroids")
plt.legend()
plt.title("K-Means (k=4) Result")
plt.show()
```
