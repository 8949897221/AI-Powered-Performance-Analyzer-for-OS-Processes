import streamlit as st
import psutil
import pandas as pd
import numpy as np
import time
import plotly.graph_objects as go
from datetime import datetime
import os
import requests

# --- Streamlit Page Config ---
st.set_page_config(
    page_title="OS Performance Analyzer Pro",
    layout="wide",
    page_icon="🖥️",
    initial_sidebar_state="expanded"
)

# --- Session State Initialization ---
if 'monitoring' not in st.session_state:
    st.session_state.monitoring = False
if 'log_data' not in st.session_state:
    st.session_state.log_data = []
if 'theme' not in st.session_state:
    st.session_state.theme = 'dark'

# --- Define Thresholds ---
CPU_THRESHOLD = 80.0
MEMORY_THRESHOLD = 85.0
DISK_THRESHOLD = 90.0

# --- Theme Selection ---
theme = st.sidebar.radio("🎨 Select Theme", ["Dark Mode", "Light Mode"])
dark_mode = True if theme == "Dark Mode" else False

# --- Function to Fetch System Information ---
def get_system_info():
    return {
        "Operating System": os.name,
        "Total RAM": f"{psutil.virtual_memory().total / (1024 ** 3):.2f} GB",
        "CPU Cores": psutil.cpu_count(logical=False),
        "Logical Processors": psutil.cpu_count(logical=True)
    }

# --- Sidebar Navigation ---
st.sidebar.title("🔍 Navigation")
page = st.sidebar.radio(
    "Choose a Section",
    ["📊 Dashboard", "🖥️ Monitor", "⚙️ Settings", "ℹ️ System Info"]
)

# --- Dashboard Page ---
if page == "📊 Dashboard":
    st.title("📊 OS Performance Analyzer")
    st.write("Monitor & analyze your system’s performance in real-time.")

    col1, col2, col3 = st.columns(3)
    col1.metric("🖥️ CPU Usage", f"{psutil.cpu_percent()}%")
    col2.metric("💾 Memory Usage", f"{psutil.virtual_memory().percent}%")
    col3.metric("📀 Disk Usage", f"{psutil.disk_usage('/').percent}%")

    # --- Live Chart Representation ---
    st.subheader("📈 Real-time Performance Monitoring")
    live_chart = st.empty()

    cpu_usage_list = []
    memory_usage_list = []
    disk_usage_list = []
    time_stamps = []

    for i in range(20):
        cpu_usage = psutil.cpu_percent()
        memory_usage = psutil.virtual_memory().percent
        disk_usage = psutil.disk_usage('/').percent
        timestamp = datetime.now().strftime("%H:%M:%S")

        cpu_usage_list.append(cpu_usage)
        memory_usage_list.append(memory_usage)
        disk_usage_list.append(disk_usage)
        time_stamps.append(timestamp)

        fig = go.Figure()
        fig.add_trace(go.Scatter(x=time_stamps, y=cpu_usage_list, name="CPU Usage", line=dict(color="orange", width=2)))
        fig.add_trace(go.Scatter(x=time_stamps, y=memory_usage_list, name="Memory Usage", line=dict(color="blue", width=2)))
        fig.add_trace(go.Scatter(x=time_stamps, y=disk_usage_list, name="Disk Usage", line=dict(color="red", width=2)))

        fig.update_layout(title="Live System Usage", xaxis_title="Time", yaxis_title="Usage (%)")
        live_chart.plotly_chart(fig, use_container_width=True)

        time.sleep(1)

# --- Monitor Page ---
elif page == "🖥️ Monitor":
    st.title("🖥️ Real-Time System Monitoring")

    monitoring_duration = st.slider("Monitoring Duration (seconds)", 10, 60, 30)

    if st.button("🚀 Start Monitoring"):
        log_data = []
        progress_bar = st.progress(0)

        for i in range(monitoring_duration):
            progress_bar.progress((i + 1) / monitoring_duration)

            cpu_usage = psutil.cpu_percent()
            memory_usage = psutil.virtual_memory().percent
            disk_usage = psutil.disk_usage('/').percent

            log_data.append([datetime.now(), cpu_usage, memory_usage, disk_usage])

            col1, col2, col3 = st.columns(3)
            col1.metric("🖥️ CPU Usage", f"{cpu_usage}%")
            col2.metric("💾 Memory Usage", f"{memory_usage}%")
            col3.metric("📀 Disk Usage", f"{disk_usage}%")

            time.sleep(1)

        df = pd.DataFrame(log_data, columns=["Timestamp", "CPU Usage", "Memory Usage", "Disk Usage"])
        st.dataframe(df)

# --- Settings Page ---
elif page == "⚙️ Settings":
    st.title("⚙️ Configure Performance Thresholds")

    CPU_THRESHOLD = st.slider("CPU Alert Threshold (%)", 50, 100, 80)
    MEMORY_THRESHOLD = st.slider("Memory Alert Threshold (%)", 50, 100, 85)
    DISK_THRESHOLD = st.slider("Disk Alert Threshold (%)", 50, 100, 90)

# --- System Info Page ---
elif page == "ℹ️ System Info":
    st.title("ℹ️ System Information")
    system_info = get_system_info()

    for key, value in system_info.items():
        st.write(f"**{key}:** {value}")

# --- Footer ---
st.markdown("<p style='text-align: center;'>OS Performance Analyzer • Version 2.0</p>", unsafe_allow_html=True)
