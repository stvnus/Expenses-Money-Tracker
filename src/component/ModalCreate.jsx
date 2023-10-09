import React from "react";
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';

class ModalCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            deskripsi: '',
            nominal: 0,
            tanggal: '',
            category: '',
            deskripsiError: '',
            nominalError: '',
            tanggalError: '' // Tambahkan state tanggalError
        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.tambahItem = this.tambahItem.bind(this);
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    handleShow() {
        this.setState({
            show: true,
            category: this.props.category
        })
    }

    handleChange(evt) {
        if (evt.target.name === 'nominal') {
            const numericValue = parseInt(evt.target.value);
            if (isNaN(numericValue)) {
                this.setState({
                    nominalError: 'Harap input angka',
                    nominal: evt.target.value
                });
            } else {
                this.setState({
                    nominalError: '',
                    nominal: numericValue
                });
            }
        } else if (evt.target.name === 'deskripsi') {
            this.setState({
                deskripsi: evt.target.value,
                deskripsiError: evt.target.value.trim() === '' ? 'Deskripsi tidak boleh kosong' : ''
            });
        } else {
            this.setState({
                [evt.target.name]: evt.target.value
            });
        }
    }

    tambahItem() {
        if (this.state.deskripsi.trim() === '') {
            this.setState({
                deskripsiError: 'Deskripsi tidak boleh kosong'
            });
        } else if (!this.state.tanggal) { // Periksa apakah tanggal kosong
            this.setState({
                tanggalError: 'Tanggal tidak boleh kosong'
            });
        } else {
            this.setState({
                deskripsiError: '',
                tanggalError: '' // Reset pesan error tanggal jika tanggal diisi
            });

            if (this.state.nominalError === '') {
                if (this.state.nominal < 500) {
                    this.setState({
                        nominalError: 'Minimal pengeluaran 500 rupiah'
                    });
                } else {
                    this.setState({
                        nominalError: ''
                    });

                    const Data = {
                        deskripsi: this.state.deskripsi,
                        nominal: this.state.nominal,
                        tanggal: this.state.tanggal,
                        category: this.state.category
                    }
                    const fnTambahItem = this.props.action;
                    fnTambahItem(Data);
                    this.setState({
                        show: false,
                        deskripsi: '',
                        nominal: 0,
                        tanggal: '',
                        deskripsiError: '',
                        nominalError: '',
                        tanggalError: '' // Reset pesan error tanggal saat berhasil menambahkan item
                    });
                }
            }
        }
    }

    render() {
        return (
            <>
                <button onClick={this.handleShow} className={this.props.variant}>{this.props.text} <i className={this.props.icon}></i></button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalheading}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi</label>
                            <input
                                type="text"
                                className={`form-control ${this.state.deskripsiError ? 'is-invalid' : ''}`}
                                placeholder="Masukan deskripsi"
                                name='deskripsi'
                                value={this.state.deskripsi}
                                onChange={this.handleChange}
                            />
                            {this.state.deskripsiError && <div className="invalid-feedback">{this.state.deskripsiError}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nominal</label>
                            <input
                                type="text"
                                className={`form-control ${this.state.nominalError ? 'is-invalid' : ''}`}
                                placeholder="Masukan Nominal"
                                name='nominal'
                                value={this.state.nominal}
                                onChange={this.handleChange}
                            />
                            {this.state.nominalError && <div className="invalid-feedback">{this.state.nominalError}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Tanggal</label>
                            <input
                                type="date"
                                className={`form-control ${this.state.tanggalError ? 'is-invalid' : ''}`}
                                placeholder="Masukan tanggal"
                                name='tanggal'
                                value={this.state.tanggal}
                                onChange={this.handleChange}
                            />
                            {this.state.tanggalError && <div className="invalid-feedback">{this.state.tanggalError}</div>}
                        </div>

                        <div>
                            <input
                                type="hidden"
                                className="form-control"
                                placeholder="masukan deskripsi"
                                name='category'
                                value={this.state.category}
                                onChange={this.handleChange}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className={this.props.variant} onClick={this.tambahItem}>
                            Save
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

ModalCreate.propTypes = {
    variant: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    modalheading: PropTypes.string.isRequired,
    category: PropTypes.string,
    action: PropTypes.func.isRequired,
};

export default ModalCreate;
