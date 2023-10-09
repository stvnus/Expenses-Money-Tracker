import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import Modal from 'react-bootstrap/Modal';

class ModalCreate extends React.Component {
    constructor() {
        super();
        this.state = {
            show: false,
            deskripsi: '',
            nominal: 0,
            tanggal: '',
            category: ''
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
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    tambahItem() {
        const Data = {
            deskripsi: this.state.deskripsi,
            nominal: parseInt(this.state.nominal),
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
        })
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
                                className="form-control"
                                placeholder="Masukan deskripsi"
                                name='deskripsi'
                                value={this.state.deskripsi}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nominal</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Masukan deskripsi"
                                name='nominal'
                                value={this.state.nominal}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Tanggal</label>
                            <input
                                type="date"
                                className="form-control"
                                placeholder="Masukan deskripsi"
                                name='tanggal'
                                value={this.state.tanggal}
                                onChange={this.handleChange}
                            />
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

// Add PropTypes validation for the props used in the component
ModalCreate.propTypes = {
    variant: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    modalheading: PropTypes.string.isRequired,
    category: PropTypes.string,
    action: PropTypes.func.isRequired,
};

export default ModalCreate;
