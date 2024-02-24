const mongoose = require('mongoose');



const loanSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    interest: { type: Number, required: true },
    installment: { type: Number }
  });
  
  const Loan = mongoose.model('Loan', loanSchema);
// Controller for saving the loan
const saveLoan = async (req, res) => {
    try {
        const { sender, receiver, amount, message, interest, installment } = req.body;
        const loan = new Loan({
            sender,
            receiver,
            amount,
            message,
            interest,
            installment
        });
        await loan.save();
        res.status(201).json({ message: 'Loan saved successfully', loan });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save loan', error: error.message });
    }
};

// Controller for getting the loan
const getLoan = async (req, res) => {
    try {
        const { receiver} = req.body
        const loans = await Loan.find({receiver});
        if (!loans) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get loan', error: error.message });
    }
};

// Controller for updating the installment
const updateInstallment = async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findById(id);
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }
        if (loan.installment==0) {
            return res.status(404).json({ message: 'Loan not found' });

        }
        loan.installment = loan.installment-1
        await loan.save();
        res.status(200).json({ message: 'Installment updated successfully', loan });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update installment', error: error.message });
    }
};

module.exports = { saveLoan, getLoan, updateInstallment };
