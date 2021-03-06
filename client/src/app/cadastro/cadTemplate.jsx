import React from 'react';
import { Input } from 'react-materialize'

import { ConfirmButton, BackButton } from '../common/buttons'
import Title from '../common/titleSubtitle'
import { empreendForm, processForm, rtForm, municipios, modalidade } from '../config/formConfig';

const CadTemplate = (props) => {
    let selector = municipios.munEmpreendimento.options.map((opt, i) =>
        <option key={i} value={opt}>{opt}</option>
    )

    let modal = modalidade.options.map((opt, i) =>
        <option key={i} value={opt}>{opt}</option>
    )

    const renderFields = (data, enableInput) => {
        let configArray = [];
        for (let keys in data) {
            configArray.push({
                id: keys,
                settings: data[keys],
                enableInput: enableInput
            })
        }

        return configArray.map((item, i) => {
            let config = item.settings

            return (
                <div key={i} className={config.divClassName}>
                    <input type={config.type}
                        id={config.name}
                        className="validate"
                        pattern={config.pattern || null}
                        required={config.name !== "complemento" && true}
                        aria-required={config.name !== "complemento" && true}
                        name={config.name}
                        onChange={props.handleChange}
                        value={props.data[item.id]}
                        placeholder=" "
                        disabled={item.enableInput}
                        onBlur={props.handleBlur}
                    />
                    <label className="active"
                        htmlFor={config.name} data-error="✘" data-success="✓">
                        {config.label}
                    </label>
                </div>
            )
        })
    }

    const autoComplete = (collection, datalist, name) => {
        if (name.length > 2) {
            return (
                <datalist id={datalist}>
                    {
                        collection.map((item, index) => {
                            return (
                                <option key={index}>{item.nome}</option>
                            )
                        })}
                </datalist>
            )
        } else {
            return
        }
    }
    const autoCompleteRt = (collection, datalist, name) => {
        if (name.length > 2) {
            return (
                <datalist id={datalist}>
                    {
                        collection.map((item, index) => {
                            return (
                                <option key={index}>{item.nomeRt}</option>
                            )
                        })}
                </datalist>
            )
        } else {
            return
        }
    }

    const user = { ...localStorage }

    return (
        <div className="container" style={{ width: '90%' }} >
            <div className="tab-pane fade show active" id="empreend">
                <Title
                    title='Cadastro de Processos'
                    subtitle='Preencha os dados do interessado e RT do processo. Caso o interessado e RT não estejam cadastrados, um novo cadastro será gerado automaticamente.'
                    color={props.color}
                />

                <form onSubmit={props.handleSubmit}>
                    <fieldset className="input-field"><legend className="input-field"><strong> 1- Interessado </strong></legend>
                        <div className="row">
                            <div className="input-field col s12 m6 l4">
                                <input
                                    type="text"
                                    list="empreendList"
                                    id="nome"
                                    className="validate"
                                    name="nome"
                                    onChange={props.handleChange}
                                    value={props.data.nome}
                                    onBlur={props.handleBlurName}
                                    disabled={props.data.enableEmp}
                                    autoFocus={true}
                                />
                                <label className="active" htmlFor="nome">Nome</label>
                                {autoComplete(props.config.empCollection, 'empreendList', props.data.nome)}
                            </div>
                            {renderFields(empreendForm, props.data.enableEmp)}
                        </div>
                    </fieldset>
                    <ConfirmButton enableInput={props.enableRtInput} enable={props.data.enableEmp} />
                    <fieldset className="input-field"><legend className="input-field"><strong> 2 - Responsável Técnico </strong></legend>
                        <div className="row">
                            <div className="input-field col s12 m6 l4">
                                <input
                                    type="text"
                                    list="rtList"
                                    className="validate"
                                    name="nomeRt"
                                    id="rtInput"
                                    onChange={props.handleChange}
                                    value={props.data.nomeRt}
                                    onBlur={props.handleBlurRtName}
                                    disabled={props.data.enableRt}
                                    autoFocus={props.data.autoFocusRt}
                                />
                                <label className="active" htmlFor="nome">Nome</label>
                                {autoCompleteRt(props.config.rtCollection, 'rtList', props.data.nomeRt)}
                            </div>
                            {renderFields(rtForm, props.data.enableRt)}
                        </div>
                    </fieldset>
                    <BackButton onClick={props.enableEmpInput} disabled={props.data.enableRt} icon='arrow_back' />
                    <ConfirmButton enableInput={props.enableProcessInput} enable={props.data.enableRt} />
                    <fieldset className="input-field"><legend className="input-field"><strong> 3 - Dados do Empreendimento </strong></legend>
                        <div className="row" >
                            {renderFields(processForm, props.data.enableProcess)}
                            <div className="col s12 m4 l2" >
                                <Input
                                    name='modalidade'
                                    type='select'
                                    label='Modalidade'
                                    defaultValue={props.data.modalidade}
                                    onChange={props.handleChange}
                                    disabled={props.data.enableProcess}
                                >
                                    {modal}
                                </Input>
                            </div>

                            <div className="col s12 m4 l3" >
                                {
                                    user.role === 'admin' ?
                                        <Input
                                            name='munEmpreendimento'
                                            type='select'
                                            label='Município'
                                            defaultValue={props.data.munEmpreendimento}
                                            onChange={props.handleChange}
                                            disabled={props.data.enableProcess}
                                        >
                                            {selector}
                                        </Input>
                                        :
                                        <div className="input-field col s12 m6 l2">
                                        </div>
                                }
                            </div>
                        </div>
                    </fieldset>
                    <div>
                        <BackButton onClick={props.backToRt} disabled={props.data.enableProcess} icon='arrow_back' />
                        <input
                            type='submit' className="btn right" disabled={props.data.enableProcess}
                            style={{ marginTop: '20px' }} value='Cadastrar processo' />
                    </div>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}

export default CadTemplate;