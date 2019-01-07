import React from 'react';
import { BackButton } from '../common/buttons'
import { allFilesLabels } from '../common/configLabels'
import showDate from '../common/showDate'

const labels = (fieldName) => {

    let allFilesArray = []
    allFilesArray = allFilesLabels()
    let label = allFilesArray.filter(e => e.nameInput.match(fieldName))
    return label[0].label
}

const LogDetails = (props) => {
    const { emp, rt, process, index, clearLog, download } = props

    const log = process.processHistory[index]
    console.log(log)
    return (
        <div style={{ paddingLeft: '3%' }}>
            <div className="row">
                <div className="row">
                    <h5> <img alt="" src="/images/folderIcon2.jpg" style={{ paddingLeft: '20px', marginRight: '20px' }} /> Arquivos > {process.nomeEmpreendimento} > {log.label}</h5>
                </div>
                <div className="row">

                    <div className="col s6">

                        <div className="col s1">
                            <img alt="" src="/images/multipleFiles2.png" />
                        </div>
                        <div className="col s11">
                            <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Arquivo</h6>
                        </div>
                    </div>
                    <div className="col s3">
                        <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Data de Upload</h6>
                    </div>
                    <div className="col s3">
                        <h6 style={{ fontSize: '1.2em', fontWeight: 500 }}>Tamanho</h6>
                    </div>
                </div>


                {log.files.map((file, i) => (

                    <div key={i}>
                        <div className="row">
                            <div className="col s6">
                                <div className="col s1">
                                    <img alt="" src="/images/genericFile.png" />
                                </div>
                                <div id={file.id}
                                    style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
                                    className="col s11"
                                    onClick={download}>
                                    {labels(file.fieldName)}
                                </div>

                            </div>
                            <div className="col s3">
                                {showDate(file.uploadDate)}
                            </div>
                            <div className="col s3">
                                {file.originalName}
                            </div>
                        </div>
                    </div>

                ))
                }

                <div className="row">
                    <div className="col s1 left" style={{ marginTop: '3%' }}>
                        <strong>
                            <i className='material-icons'
                                style={{ color: 'teal', cursor: 'pointer', border:'1px solid #ddd', borderRadius: '35%' }}
                                onClick={clearLog}
                            > arrow_back
                            </i>
                        </strong>


                    </div>
                </div>
            </div>
        </div>
    )
};

export default LogDetails;