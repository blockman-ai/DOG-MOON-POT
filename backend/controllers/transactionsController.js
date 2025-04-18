const { validateDogRune, validateSolanaTransaction } = require('../utils/validators');

exports.validateTransaction = async (req, res) => {
    const { blockchain, txid } = req.body;

        try {
                let validation;
                        if (blockchain === 'bitcoin') {
                                    validation = await validateDogRune(txid);
                                            } else if (blockchain === 'solana') {
                                                        validation = await validateSolanaTransaction(txid);
                                                                } else {
                                                                            return res.status(400).json({ error: 'Invalid blockchain provided' });
                                                                                    }

                                                                                            res.status(200).json(validation);
                                                                                                } catch (error) {
                                                                                                        console.error('Error:', error);
                                                                                                                res.status(500).json({ error: 'Internal server error' });
                                                                                                                    }
                                                                                                                    };
                                                                                                                    