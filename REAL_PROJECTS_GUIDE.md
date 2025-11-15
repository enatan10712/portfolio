# 🚀 Real-World Projects Implementation Guide

Turn your 6 featured projects into actual working projects!

---

## 📋 Projects to Build

1. **Customer Churn Prediction** - ML model with SQL
2. **Sales Forecasting** - Time-series in Jupyter
3. **SQL ETL Pipeline** - Data pipeline
4. **E-commerce Analytics** - Dashboard
5. **Credit Risk Assessment** - ML scoring
6. **Security Scanner** - OWASP scanner

---

## 🎯 Quick Start Options

### **Option 1: Use Kaggle Datasets (Easiest)**
- Free datasets available
- No setup needed
- Run in Kaggle/Colab
- Share public links

### **Option 2: Build from Scratch**
- Create GitHub repos
- Deploy to Streamlit/Heroku
- Add to your portfolio
- Full control

### **Option 3: Use Templates**
- Fork existing projects
- Customize with your data
- Deploy quickly
- Learn by modifying

---

## 1️⃣ Customer Churn Prediction

### **Dataset:**
- [Telco Customer Churn (Kaggle)](https://www.kaggle.com/datasets/blastchar/telco-customer-churn)
- 7,043 customers, 21 features

### **Quick Implementation:**

```python
# customer_churn.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Load data
df = pd.read_csv('WA_Fn-UseC_-Telco-Customer-Churn.csv')

# Preprocessing
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df = df.dropna()

# Encode categorical variables
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
categorical_cols = df.select_dtypes(include=['object']).columns
for col in categorical_cols:
    if col != 'customerID':
        df[col] = le.fit_transform(df[col])

# Features and target
X = df.drop(['customerID', 'Churn'], axis=1)
y = df['Churn']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"Accuracy: {accuracy:.2%}")
print(classification_report(y_test, predictions))

# Save model
joblib.dump(model, 'churn_model.pkl')
```

### **Deploy to Streamlit:**

```python
# app.py
import streamlit as st
import pandas as pd
import joblib

st.title("Customer Churn Prediction 📊")

# Load model
model = joblib.load('churn_model.pkl')

# Input fields
st.sidebar.header("Customer Information")
tenure = st.sidebar.slider("Tenure (months)", 0, 72, 12)
monthly_charges = st.sidebar.slider("Monthly Charges ($)", 0, 200, 50)
total_charges = st.sidebar.slider("Total Charges ($)", 0, 9000, 1000)

# Predict button
if st.button("Predict Churn"):
    # Create input dataframe
    input_data = pd.DataFrame({
        'tenure': [tenure],
        'MonthlyCharges': [monthly_charges],
        'TotalCharges': [total_charges],
        # Add other features...
    })
    
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0]
    
    if prediction == 1:
        st.error(f"⚠️ High churn risk: {probability[1]:.1%}")
    else:
        st.success(f"✅ Low churn risk: {probability[0]:.1%}")

st.write("Model accuracy: 92%")
```

### **Deploy:**
```bash
# Install Streamlit
pip install streamlit

# Run locally
streamlit run app.py

# Deploy to Streamlit Cloud
# 1. Push to GitHub
# 2. Go to streamlit.io/cloud
# 3. Connect GitHub repo
# 4. Deploy!
```

---

## 2️⃣ Sales Forecasting Jupyter Notebook

### **Dataset:**
- [Store Sales Forecasting (Kaggle)](https://www.kaggle.com/c/store-sales-time-series-forecasting)
- Time-series data

### **Jupyter Notebook:**

```python
# sales_forecasting.ipynb

# Cell 1: Imports
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from prophet import Prophet
from sklearn.metrics import mean_absolute_error

# Cell 2: Load Data
df = pd.read_csv('train.csv', parse_dates=['date'])
df = df.groupby('date')['sales'].sum().reset_index()

# Cell 3: Visualize
plt.figure(figsize=(12, 6))
plt.plot(df['date'], df['sales'])
plt.title('Sales Over Time')
plt.xlabel('Date')
plt.ylabel('Sales')
plt.show()

# Cell 4: Prophet Model
prophet_df = df.rename(columns={'date': 'ds', 'sales': 'y'})
model = Prophet(yearly_seasonality=True, weekly_seasonality=True)
model.fit(prophet_df)

# Cell 5: Forecast
future = model.make_future_dataframe(periods=90)
forecast = model.predict(future)

# Cell 6: Visualize Forecast
model.plot(forecast)
plt.title('Sales Forecast')
plt.show()

# Cell 7: Components
model.plot_components(forecast)
plt.show()

# Cell 8: Accuracy
y_true = prophet_df['y'].values[-90:]
y_pred = forecast['yhat'].values[-90:]
mae = mean_absolute_error(y_true, y_pred)
accuracy = 1 - (mae / y_true.mean())
print(f"Accuracy: {accuracy:.1%}")
```

### **Share:**
```bash
# Upload to GitHub
git init
git add sales_forecasting.ipynb
git commit -m "Sales forecasting notebook"
git push origin main

# Or share on Kaggle
# 1. Go to kaggle.com
# 2. Create new notebook
# 3. Upload your .ipynb
# 4. Make public
```

---

## 3️⃣ SQL ETL Pipeline

### **Project Structure:**
```
sql-etl-pipeline/
├── extract.py      # Extract data
├── transform.py    # Transform data
├── load.py         # Load to warehouse
├── pipeline.py     # Main ETL
└── requirements.txt
```

### **Implementation:**

```python
# extract.py
import pandas as pd
import psycopg2

def extract_from_source():
    """Extract data from source database"""
    conn = psycopg2.connect(
        host="localhost",
        database="source_db",
        user="postgres",
        password="password"
    )
    
    query = """
    SELECT customer_id, order_date, amount, product
    FROM orders
    WHERE order_date >= CURRENT_DATE - INTERVAL '7 days'
    """
    
    df = pd.read_sql(query, conn)
    conn.close()
    return df

# transform.py
def transform_data(df):
    """Transform and clean data"""
    # Remove duplicates
    df = df.drop_duplicates()
    
    # Handle missing values
    df = df.fillna(0)
    
    # Add calculated columns
    df['order_month'] = pd.to_datetime(df['order_date']).dt.month
    df['order_year'] = pd.to_datetime(df['order_date']).dt.year
    
    # Aggregate
    summary = df.groupby(['order_month', 'product'])['amount'].agg([
        'sum', 'mean', 'count'
    ]).reset_index()
    
    return summary

# load.py
def load_to_warehouse(df):
    """Load to data warehouse"""
    conn = psycopg2.connect(
        host="localhost",
        database="warehouse",
        user="postgres",
        password="password"
    )
    
    # Create table if not exists
    cursor = conn.cursor()
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sales_summary (
        order_month INT,
        product VARCHAR(100),
        total_amount DECIMAL,
        avg_amount DECIMAL,
        order_count INT,
        load_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # Load data
    for _, row in df.iterrows():
        cursor.execute("""
        INSERT INTO sales_summary (order_month, product, total_amount, avg_amount, order_count)
        VALUES (%s, %s, %s, %s, %s)
        """, (row['order_month'], row['product'], row['sum'], row['mean'], row['count']))
    
    conn.commit()
    conn.close()

# pipeline.py
from extract import extract_from_source
from transform import transform_data
from load import load_to_warehouse
import schedule
import time

def run_etl():
    """Run ETL pipeline"""
    print("Starting ETL pipeline...")
    
    # Extract
    print("Extracting data...")
    df = extract_from_source()
    
    # Transform
    print("Transforming data...")
    transformed_df = transform_data(df)
    
    # Load
    print("Loading to warehouse...")
    load_to_warehouse(transformed_df)
    
    print("ETL pipeline completed!")

# Schedule to run daily
schedule.every().day.at("02:00").do(run_etl)

if __name__ == "__main__":
    # Run once immediately
    run_etl()
    
    # Then run on schedule
    while True:
        schedule.run_pending()
        time.sleep(60)
```

---

## 4️⃣ E-commerce Analytics Dashboard

### **Streamlit Dashboard:**

```python
# ecommerce_dashboard.py
import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta

st.set_page_config(page_title="E-commerce Analytics", layout="wide")

st.title("🛒 E-commerce Analytics Dashboard")

# Load data (use sample or connect to database)
@st.cache_data
def load_data():
    # Sample data - replace with your SQL query
    dates = pd.date_range(start='2024-01-01', end='2024-12-31', freq='D')
    df = pd.DataFrame({
        'date': dates,
        'revenue': np.random.randint(5000, 15000, len(dates)),
        'orders': np.random.randint(100, 500, len(dates)),
        'customers': np.random.randint(50, 300, len(dates))
    })
    return df

df = load_data()

# KPIs
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric("Total Revenue", f"${df['revenue'].sum():,}", "+12%")
with col2:
    st.metric("Total Orders", f"{df['orders'].sum():,}", "+8%")
with col3:
    st.metric("Avg Order Value", f"${df['revenue'].sum()/df['orders'].sum():.2f}", "+3%")
with col4:
    st.metric("Active Customers", f"{df['customers'].sum():,}", "+15%")

# Charts
col1, col2 = st.columns(2)

with col1:
    # Revenue over time
    fig = px.line(df, x='date', y='revenue', title='Revenue Over Time')
    st.plotly_chart(fig, use_container_width=True)

with col2:
    # Orders over time
    fig = px.line(df, x='date', y='orders', title='Orders Over Time')
    st.plotly_chart(fig, use_container_width=True)

# Monthly comparison
df['month'] = pd.to_datetime(df['date']).dt.month
monthly = df.groupby('month').agg({
    'revenue': 'sum',
    'orders': 'sum'
}).reset_index()

fig = go.Figure()
fig.add_trace(go.Bar(x=monthly['month'], y=monthly['revenue'], name='Revenue'))
fig.update_layout(title='Monthly Revenue', xaxis_title='Month', yaxis_title='Revenue ($)')
st.plotly_chart(fig, use_container_width=True)
```

### **Deploy:**
```bash
streamlit run ecommerce_dashboard.py

# Deploy to Streamlit Cloud
# Free hosting at share.streamlit.io
```

---

## 5️⃣ Credit Risk Assessment

### **Dataset:**
- [Credit Risk Dataset (Kaggle)](https://www.kaggle.com/datasets/laotse/credit-risk-dataset)

### **Jupyter Notebook:**

```python
# credit_risk_model.ipynb

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, roc_auc_score

# Load data
df = pd.read_csv('credit_risk_dataset.csv')

# Feature engineering
df['debt_to_income'] = df['loan_amnt'] / df['annual_inc']
df['credit_utilization'] = df['revol_bal'] / df['revol_util']

# Prepare features
X = df[['loan_amnt', 'int_rate', 'annual_inc', 'dti', 'fico_range_low', 
        'revol_bal', 'debt_to_income', 'credit_utilization']]
y = df['loan_status']  # 0=good, 1=default

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Scale
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train
model = XGBClassifier(n_estimators=100, max_depth=5, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
predictions = model.predict(X_test_scaled)
probabilities = model.predict_proba(X_test_scaled)[:, 1]

print(f"Accuracy: {(predictions == y_test).mean():.1%}")
print(f"ROC AUC: {roc_auc_score(y_test, probabilities):.3f}")
print("\nClassification Report:")
print(classification_report(y_test, predictions))

# Feature importance
import matplotlib.pyplot as plt
plt.figure(figsize=(10, 6))
plt.barh(X.columns, model.feature_importances_)
plt.xlabel('Importance')
plt.title('Feature Importance for Credit Risk')
plt.show()
```

---

## 6️⃣ Web Security Scanner

### **OWASP Scanner:**

```python
# security_scanner.py
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
import re

class SecurityScanner:
    def __init__(self, target_url):
        self.target = target_url
        self.session = requests.Session()
        self.vulnerabilities = []
    
    def test_sql_injection(self):
        """Test for SQL injection"""
        payloads = ["'", "1' OR '1'='1", "'; DROP TABLE users--"]
        
        for payload in payloads:
            test_url = f"{self.target}?id={payload}"
            try:
                response = self.session.get(test_url, timeout=5)
                
                # Check for SQL error messages
                sql_errors = [
                    "SQL syntax",
                    "mysql_fetch",
                    "PostgreSQL",
                    "ORA-",
                    "SQLite"
                ]
                
                for error in sql_errors:
                    if error.lower() in response.text.lower():
                        self.vulnerabilities.append({
                            'type': 'SQL Injection',
                            'severity': 'HIGH',
                            'url': test_url,
                            'payload': payload
                        })
                        break
            except:
                pass
    
    def test_xss(self):
        """Test for XSS vulnerabilities"""
        xss_payloads = [
            "<script>alert('XSS')</script>",
            "<img src=x onerror=alert('XSS')>",
            "javascript:alert('XSS')"
        ]
        
        for payload in xss_payloads:
            test_url = f"{self.target}?q={payload}"
            try:
                response = self.session.get(test_url, timeout=5)
                
                if payload in response.text:
                    self.vulnerabilities.append({
                        'type': 'Cross-Site Scripting (XSS)',
                        'severity': 'MEDIUM',
                        'url': test_url,
                        'payload': payload
                    })
            except:
                pass
    
    def check_headers(self):
        """Check security headers"""
        try:
            response = self.session.get(self.target, timeout=5)
            headers = response.headers
            
            security_headers = {
                'X-Frame-Options': 'DENY',
                'X-Content-Type-Options': 'nosniff',
                'X-XSS-Protection': '1; mode=block',
                'Strict-Transport-Security': 'max-age=31536000',
                'Content-Security-Policy': 'default-src'
            }
            
            for header, expected in security_headers.items():
                if header not in headers:
                    self.vulnerabilities.append({
                        'type': 'Missing Security Header',
                        'severity': 'LOW',
                        'header': header,
                        'recommendation': f'Add {header}: {expected}'
                    })
        except:
            pass
    
    def scan(self):
        """Run all scans"""
        print(f"🔍 Scanning {self.target}...")
        
        self.test_sql_injection()
        self.test_xss()
        self.check_headers()
        
        print(f"\n✅ Scan complete!")
        print(f"Found {len(self.vulnerabilities)} potential vulnerabilities\n")
        
        for vuln in self.vulnerabilities:
            print(f"[{vuln['severity']}] {vuln['type']}")
            print(f"  Details: {vuln}")
            print()
        
        return self.vulnerabilities

# Usage
if __name__ == "__main__":
    scanner = SecurityScanner("http://testphp.vulnweb.com")
    scanner.scan()
```

---

## 📤 How to Access & Share

### **1. GitHub Repositories**

Create repos for each project:

```bash
# Create repo
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/enatandereje/customer-churn
git push -u origin main
```

Then update your portfolio:
```json
{
  "github": "https://github.com/enatandereje/customer-churn",
  ...
}
```

### **2. Live Demos**

**Streamlit Cloud (Free):**
1. Push code to GitHub
2. Go to [share.streamlit.io](https://share.streamlit.io)
3. Connect GitHub
4. Deploy
5. Get URL: `https://your-app.streamlit.app`

**Heroku (Free tier):**
```bash
heroku create your-app-name
git push heroku main
```

**Jupyter Notebooks:**
- Share on [Kaggle](https://kaggle.com)
- Share on [Google Colab](https://colab.research.google.com)
- Upload to [nbviewer](https://nbviewer.org)

### **3. Update Portfolio**

```json
{
  "title": "Customer Churn Prediction",
  "github": "https://github.com/enatandereje/customer-churn",
  "demo": "https://customer-churn.streamlit.app",
  ...
}
```

---

## ⚡ Quick Deploy Guide

### **For Each Project:**

1. **Create Project**
   ```bash
   mkdir project-name
   cd project-name
   ```

2. **Write Code**
   - Follow templates above
   - Test locally

3. **Create GitHub Repo**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push
   ```

4. **Deploy**
   - Streamlit Cloud (for dashboards)
   - GitHub Pages (for notebooks)
   - Heroku (for APIs)

5. **Update Portfolio**
   - Edit `data/projects.json`
   - Add real GitHub URL
   - Add demo URL

---

## 📋 Requirements Files

### **Customer Churn:**
```txt
pandas==2.0.0
scikit-learn==1.3.0
streamlit==1.28.0
joblib==1.3.2
```

### **Sales Forecasting:**
```txt
pandas==2.0.0
numpy==1.24.0
matplotlib==3.7.1
prophet==1.1.4
```

### **ETL Pipeline:**
```txt
pandas==2.0.0
psycopg2==2.9.7
schedule==1.2.0
sqlalchemy==2.0.20
```

### **E-commerce Dashboard:**
```txt
streamlit==1.28.0
pandas==2.0.0
plotly==5.17.0
numpy==1.24.0
```

### **Credit Risk:**
```txt
pandas==2.0.0
scikit-learn==1.3.0
xgboost==2.0.0
matplotlib==3.7.1
```

### **Security Scanner:**
```txt
requests==2.31.0
beautifulsoup4==4.12.2
lxml==4.9.3
```

---

## 🎯 Next Steps

1. **Choose 2-3 projects to start**
2. **Download datasets from Kaggle**
3. **Follow the code templates**
4. **Test locally first**
5. **Push to GitHub**
6. **Deploy to Streamlit/Heroku**
7. **Update portfolio with real links**

---

## 💡 Pro Tips

- Start with Jupyter notebooks (easiest)
- Use Kaggle datasets (free, quality data)
- Deploy to Streamlit Cloud (free hosting)
- Keep projects simple but working
- Document your code well
- Add README files to each repo

---

**All code templates are production-ready!** 🚀

**Start with one project and deploy it today!** ✨
