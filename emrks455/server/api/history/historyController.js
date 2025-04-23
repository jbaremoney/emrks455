const historyModel = require('./historyModel');

exports.getMedicalHistoryBySSN = async (req, res) => {
  try {
    const { ssn } = req.params;
    const history = await historyModel.getMedicalHistoryBySSN(ssn);

    if (history.length === 0) {
      return res.status(404).json({ message: 'No history found for this patient' });
    }

    res.json(history);
  } catch (err) {
    console.error('Error getting medical history:', err);
    res.status(500).json({ error: 'Failed to get medical history' });
  }
};
