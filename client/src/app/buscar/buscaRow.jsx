import React from 'react';
import { configLabels, configEmpLabels, configRtLabels } from '../common/configLabels';
import { DeleteButton, EditButton } from './../common/buttons'
import './../css/styles.css';

const ShowEmpRow = (props) => {

    let { redux, emps, rts, process, empFields, rtFields, showRt, edit, deleteOne, data, fields,
        divConfig, color, empDetails, rtDetails } = props

    let searchMatch = []
    let selectedFields
    let headerLabels = []

    if ((emps && emps[0]) && data.edit === false) {
        searchMatch = emps
        selectedFields = empFields
        headerLabels = configEmpLabels
        divConfig = ['col s2', 'col s2', 'col s2', 'col s2', 'col s2' ]
    } else if ((rts && rts[0]) && data.edit === false) {
        searchMatch = rts
        selectedFields = rtFields
        headerLabels = configRtLabels
        divConfig = ['col s4', 'col s4', 'col s4']
    } else if ((process && process[0]) && data.edit === false) {
        searchMatch = process
        selectedFields = fields
        headerLabels = configLabels
    } else {
        return null
    }

    //****************** HEADER *********************

    let fieldsConfig = []
    headerLabels.length > 0 ?
        selectedFields.map(i => fieldsConfig.push({
            name: headerLabels[i].name,
            label: headerLabels[i].label,
            div: headerLabels[i].div
        }))
        : void 0

    return (
        <div className="z-depth-3" style={{ padding: '0px 11px', borderRadius: '10px' }}>
            <div className="row "
                style={{
                    fontSize: 16,
                    fontFamily: 'arial',
                    fontWeight: 'bold',
                    backgroundColor: color,
                    filter: 'brightness(190%)',
                    padding: '5px 0px',
                }}>

                {
                    fieldsConfig.map((field, i) =>
                        field.name !== '_id' ?
                            <div className={divConfig[i]} key={i}> {field.label} </div> : void 0
                    )
                }
                {
                    data.select === 'process' ?
                        <div>
                            <div className='col s1'>
                                Interessado </div>

                            {
                                showRt ?
                                    <div className='col s1'>
                                        RT </div> : void 0
                            }
                        </div>
                        : void 0
                }
            </div>

            {/* ***************** BODY / ROWS ***************** */}
            {

                searchMatch.map((item, k) => {

                    let empName
                    let rtName
                    let itemArray = []
                    let empreend = redux.empCollection.filter(emp => emp._id.match(item.empId))

                    for (let keys in empreend) {
                        empName = {
                            key: keys,
                            values: empreend[keys]
                        }
                    }

                    rtName = redux.rtCollection.filter(rt => rt._id.match(item.rtId))
                    for (let keys in rtName) {
                        rtName = {
                            key: keys,
                            values: rtName[keys]
                        }
                    }

                    for (let keys in item) {
                        itemArray.push({
                            key: keys,
                            values: item[keys]
                        })
                    }

                    let i2 = []
                    selectedFields && selectedFields.length > 0 ? selectedFields.map(i => i2.push(itemArray[i])) : void 0

                    return (
                        <div className="row" key={k} style={{ borderBottom: 'dotted #bbb' }}>
                            {
                                i2.map((field, i) =>
                                    field.key !== '_id' ?

                                        !isNaN(Date.parse(field.values)) && String(field.values).length > 15 ?
                                            <div key={i} className="col s1">
                                                {new Date(field.values).getDate()}/{new Date(field.values).getMonth() + 1}/{new Date(field.values).getFullYear()}
                                            </div> :
                                            <div key={i} className={divConfig[i]}>
                                                {field.values}
                                            </div>
                                        : void 0
                                )
                            }
                            {
                                (data.select === 'process' && (empName && empName.values)) ?

                                    <div id={empName.values._id} className='col s1' style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={empDetails}>
                                        {empName.values.nome}
                                    </div> : <div className='col s2'>  </div>
                            }

                            {
                                (showRt && (data.select === 'process' && (rtName && rtName.values))) ?
                                    <div id={rtName.values._id} className='col s1' style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={rtDetails}>
                                        {rtName.values.nomeRt}
                                    </div>
                                    : <div className='col s1'> </div>
                            }

                            <div className="col s2 right" style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                maxWidth: '95px',
                                margin: '0 auto',
                                padding: '0px 5px',
                            }}>
                                <EditButton edit={edit} id={item._id} />
                                <DeleteButton delete={deleteOne} id={item._id} />

                            </div>
                        </div>
                    )
                })
            }
        </div >
    )
};


/*  return (
     <div className="col s12">

         <RenderSearch
             search={searchMatch}
             fields={[1, 2, 3, 4, 8, 11]}
             collection={redux.empCollection}
             rtCollection={redux.rtCollection}
             renderEmp={true}
             renderRt={true}
             color={data.setColor}

         />
         
         <div className="col s1 right">
             <RenderButtons
                 onClick={edit}
                 id='item._id'
                 icon='create'
                 title='Editar'
                 className='btn-flat waves-effect btn-floating blue red darken-3'
             />
         </div>
        <div className="col s1 right">
             <DeleteButton delete={deleteOne} id={item._id} />
         </div>
     </div>
 ) */


export default ShowEmpRow;