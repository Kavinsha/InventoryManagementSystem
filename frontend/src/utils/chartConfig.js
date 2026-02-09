// Reusable chart data builders and options for the app
export const commonOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' },
    tooltip: { mode: 'index', intersect: false }
  },
};

export const buildBarData = (labels = [], data = [], labelText = 'Quantity') => ({
  labels,
  datasets: [
    {
      label: labelText,
      data,
      backgroundColor: 'rgba(54,205,219,0.6)'
    }
  ]
});

export const buildPieData = (paid = 0, pending = 0) => ({
  labels: ['Paid', 'Pending'],
  datasets: [
    {
      data: [paid, pending],
      backgroundColor: ['#2ecc71', '#e74c3c']
    }
  ]
});

export default { commonOptions, buildBarData, buildPieData };
