'use client'

import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';
import styled from 'styled-components';
// import Header from '../components/header';
import Header from '@/components/Header';
import axios from 'axios';
import Link from "next/link";
import Swal from 'sweetalert2';
import Chatting from '@/app/chatting';
import { getCancelingContractData, getCanceledContractData, patchCancelSign, patchAgreementSign } from '@/api/cancelContractsObject';
import * as Styled from '@/styles/cancelContractObject.styles'

interface Paticipation {
    contractor: string;
    signState: string;
}

const Cancel_Contracts_object = () => {

    const access_token : any  = localStorage.getItem('access-token');
    const contractId : any = localStorage.getItem('contractId');
    console.log("파기계약서", contractId)
    const contractType = localStorage.getItem('state');

    const [contractObject_contractId, setContractObject_contractId] = useState(0); 
    const [contractObject_title, setContractObject_title] = useState(''); 
    const [contractObject_content, setContractObject_content] = useState(''); 
    const [contractObject_createdAt, setContractObject_createdAt] = useState(''); 
    const [contractObject_modifiedAt, setContractObject_modifiedAt] = useState(''); 
    const [contractObject_destroy_participation, setContractObject_destroy_participation] = useState<Paticipation[]>([])


    const handleContarctObject_4 = async () => {
        try {
            const contractData = await getCancelingContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
            setContractObject_destroy_participation(contractData.contractorAndSignStates);
            // Update state with contractData
            // ...
        } catch (error) {
            // Handle error
        }
    };

    const handleContarctObject_5 = async () => {
        try {
            const contractData = await getCanceledContractData(contractId, access_token);
            setContractObject_contractId(contractData.contractId);
            setContractObject_title(contractData.title);
            setContractObject_content(contractData.content);
            setContractObject_createdAt(contractData.createdAt);
            setContractObject_modifiedAt(contractData.modifiedAt);
            // Update state with contractData
            // ...
        } catch (error) {
            // Handle error
        }
    };

    console.log(contractType,"입니다.", contractId, "입니다.")
    useEffect(() => {
        if (contractType === 'CANCELING'){
            handleContarctObject_4();
        }
        else if (contractType === 'CANCELED'){
            handleContarctObject_5();
        }


    }, []);


    //전자서명 등록
    const handleContractSign2 = async (event: any) => {
        try {
            await patchCancelSign(contractId, access_token);
            // Handle success
        } catch (error) {
            // Handle error
        }
    };
    

    //파기계약서 작성
    const handleCancelingContract = async (event: any) => {
        event.preventDefault();
        try {
            await patchAgreementSign(contractId, access_token);
            // Handle success
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div>
            <Header/>
            <Chatting></Chatting>
            <Styled.Container>
                <Styled.Container1>계약서</Styled.Container1>
                <Styled.Container2>
                    <Styled.Container2Title>제목</Styled.Container2Title>
                    <Styled.Container2Content>{contractObject_title}</Styled.Container2Content>
                </Styled.Container2>
                <Styled.Container3>
                    <Styled.Container3Title>작성일자</Styled.Container3Title>
                    <Styled.Container3Content>{contractObject_createdAt.split("T")[0]}</Styled.Container3Content>
                    <Styled.Container3Title>수정일자</Styled.Container3Title>
                    <Styled.Container3Content>{contractObject_modifiedAt.split("T")[0]}</Styled.Container3Content>
                </Styled.Container3>
                <Styled.Container4>
                    <Styled.Container4Title>내용</Styled.Container4Title>
                    <Styled.Container4Content>{contractObject_content}</Styled.Container4Content>
                </Styled.Container4>
            </Styled.Container>

            {/* 파기계약서 */}
            {contractType === 'CANCELING' && (
                <Styled.ContainerBtnContainer>
                    <form onSubmit={handleCancelingContract}>
                        <Styled.ContainerBtnContainerB3>삭제</Styled.ContainerBtnContainerB3>
                    </form>
                    <Styled.ContainerParticipationList>
                    {contractObject_destroy_participation.map((item, index) => (
                        <Styled.ContainerParticipationListContainer key={index}>
                            <Styled.ContainerParticipationListContainerName style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.contractor}
                             </Styled.ContainerParticipationListContainerName>
                            <Styled.ContainerParticipationListContainerState style={{ background: item.signState === 'Y' ? 'lime' : '#f1f1f1' }}>
                                {item.signState}
                            </Styled.ContainerParticipationListContainerState>
                        </Styled.ContainerParticipationListContainer>
                    ))}
                    </Styled.ContainerParticipationList>
                    <form onSubmit={handleContractSign2}>
                        <Styled.ContainerBtnContainerB5>전자서명 등록</Styled.ContainerBtnContainerB5>
                    </form>
                </Styled.ContainerBtnContainer>
            )}
            
        </div>
    );
};



export default Cancel_Contracts_object;