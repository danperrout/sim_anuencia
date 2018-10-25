import React, { Component } from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadEmpData, loadRtData, loadProcessData } from '../cadastro/cadActions';
import { deleteEmp, deleteRt, deleteProcess, handleEdit, disableEdit, changeHandler } from './buscaActions';
import { BackButton, UpdateButton } from './../common/buttons';

import ShowDetails from '../common/showDetails'
import EditData from './editData';
import ShowEmpTemplate from './buscaTemplate';
import ShowEmpRow from './buscaRow';

class ShowEmpContainer extends Component {

    state = {
        search: '',
        select: 'process',
        edit: false,
        selectId: '',
        itemId: '',
        item: {},
        nome: '',
        setColor: '',
        showEmpDetails: false,
        showRtDetails: false,
        empId: '',
        rtId: '',
        cgt: ''
    }

    componentDidMount() {
        !this.props.cadastro.empCollection[0] ? this.props.loadEmpData() : void 0
        !this.props.cadastro.rtCollection[0] ? this.props.loadRtData() : void 0
        !this.props.cadastro.processCollection[0] ? this.props.loadProcessData() : void 0

        let color = document.getElementById('setcolor').style.backgroundColor
        this.setState({ setColor: color })

    }

    deleteHandler = (item) => {
        if (this.state.select === 'emp') {
            this.props.deleteEmp(item)
        }
        if (this.state.select === 'rt') {
            this.props.deleteRt(item)
        }
        if (this.state.select === 'process') {
            this.props.deleteProcess(item);
        }
    }

    handleSearchBar = (e) => {
        this.setState({
            ...this.state, search: e.target.value,
        })

        setTimeout(() => {
            this.props.changeHandler(this.state.search)
        }, 30);
    }

    handleSelect = (e) => {
        this.setState({
            ...this.state, select: e.target.value,
        })
    }

    enableEdit = (itemId) => {

        let item = []
        let itemObj = {}
        if (this.state.select === 'emp') {
            item = this.props.cadastro.empCollection.filter(el => el._id.match(itemId))
            itemObj = Object.assign({}, item)
        }



        if (this.state.select === 'rt') {
            item = this.props.cadastro.rtCollection.filter(el => el._id.match(itemId))
            itemObj = Object.assign({}, item)
        }

        if (this.state.select === 'process') {
            item = this.props.cadastro.processCollection.filter(el => el._id.match(itemId))
            itemObj = Object.assign({}, item)
        }
        this.setState({
            ...this.state,
            item: itemObj[0],
            edit: true
        })
    }

    disableEdit = () => {
        this.props.disableEdit()
        this.setState({ ...this.state, edit: false })
    }

    editValue = (event) => {
        if (this.state.item) {
            let update = Object.assign({}, this.state.item, { [event.target.name]: event.target.value }, {cgt: new Date(2020)})
            this.setState({ ...this.state, item: update })
        }
    }

    saveEdit = (e) => {

        if (this.state.item && this.state.select === 'emp') {
            axios.put(('/api/editEmp'), {
                item: this.state.item
            })
        }
        if (this.state.item && this.state.select === 'rt') {
            axios.put(('/api/editRt'), {
                item: this.state.item
            }).catch(err => alert(err))
        }
        if (this.state.item && this.state.select === 'process') {
            axios.put(('/api/editProcess'), {
                item: this.state.item
            }).catch(err => alert(err))
        }
    }

    empDetails(e) {
        this.setState({ showEmpDetails: true, showRtDetails: false, empId: e.target.id })
    }
    rtDetails(e) {
        this.setState({ showEmpDetails: false, showRtDetails: true, rtId: e.target.id })
    }

    closeDetails() {
        this.setState({ showEmpDetails: false, showRtDetails: false, empId: '', rtId: '' })
    }


    render() {


        let emps = []
        let rts = []
        let process = []
        let searchString = this.state.search.trim().toLowerCase();

        if (this.state.search && this.state.select === 'emp') {
            emps = this.props.cadastro.empCollection.filter((el) => el.nome.toLowerCase().match(searchString))
        } else if (!this.state.search && this.state.select === 'emp') {
            emps = this.props.cadastro.empCollection.slice(0, 50)
        }

        if (this.state.search && this.state.select === 'rt') {
            rts = this.props.cadastro.rtCollection.filter((el) => el.nomeRt.toLowerCase().match(searchString))
        } else if (!this.state.search && this.state.select === 'rt') {
            rts = this.props.cadastro.rtCollection.slice(0, 300)
        }

        if (this.state.search && this.state.select === 'process') {
            process = this.props.cadastro.processCollection.filter((el) => el.nomeEmpreendimento.toLowerCase().match(searchString))
        } else if (!this.state.search && this.state.select === 'process') {
            process = this.props.cadastro.processCollection
            process.sort(function (a, b) {

                let ca = new Date(a.createdAt)
                let cb = new Date(b.createdAt)
                if (ca && cb) {

                    if (cb.getTime() > ca.getTime()) {
                        return 1
                    } else if (ca.getTime() > cb.getTime()) {
                        return -1
                    } else return 0
                }
            })
        }

        return (
            <div className="container " >
                <ShowEmpTemplate
                    search={this.state.search}
                    select={this.state.select}
                    edit={this.state.edit}
                    redux={this.props.cadastro}
                    onSelect={this.handleSelect}
                    change={e => this.handleSearchBar(e)}
                    color={this.state.setColor}
                />

                <ShowEmpRow
                    data={this.state}
                    redux={this.props.cadastro}
                    emps={emps}
                    rts={rts}
                    process={process}
                    empFields={[1, 3, 6, 7, 8]}
                    rtFields={[1, 2, 3]}
                    fields={[4, 6, 7, 8, 11, 10, 9]}
                    divConfig={['', 'col s2', 'col s1', 'col s1', 'col s1', 'col s1', 'col s1']}
                    edit={this.enableEdit.bind(this)}
                    deleteOne={this.deleteHandler.bind(this)}
                    color={this.state.setColor}
                    empDetails={this.empDetails.bind(this)}
                    rtDetails={this.rtDetails.bind(this)}
                />

                <EditData
                    redux={this.props.cadastro}
                    data={this.state}
                    disableEdit={this.disableEdit.bind(this)}
                    change={e => this.editValue(e)}
                    submit={e => this.saveEdit(e)} />

                <div>
                    {this.state.edit ? <BackButton
                        onClick={this.disableEdit} icon='arrow_back'
                    /> : null}

                    <UpdateButton
                        form={`${this.state.select}`}
                        display={this.state.edit}
                    />
                    <ShowDetails
                        empId={this.state.empId}
                        rtId={this.state.rtId}
                        showEmp={this.state.showEmpDetails}
                        showRt={this.state.showRtDetails}
                        close={this.closeDetails.bind(this)}
                        empCollection={this.props.cadastro.empCollection}
                        rtCollection={this.props.cadastro.rtCollection}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cadastro: state.cadastro
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ loadEmpData, loadRtData, loadProcessData, deleteEmp, deleteRt, deleteProcess, handleEdit, disableEdit, changeHandler }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEmpContainer);