import * as React from 'react'
import styled from 'styled-components'
// import { useStateWithStorage } from '../hooks/use_state_with_storage';
import * as ReactMarkdown from 'react-markdown';
import { putMemo } from '../indexeddb/memos';
import { Button } from '../indexeddb/button';
import { SaveModal } from '../components/save_modal';
import { Link } from 'react-router-dom';
import { Header } from '../components/header';

// const StorageKey = 'pages/editor.tsx';
const gfm = require('remark-gfm')
// const render = require('react-dom').render
const { useState } = React;


const Wrapper = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 3rem;
`

const HeaderArea = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
`

const TextArea = styled.textarea`
    border-right: 1px solid silver;
    border-top: 1px solid silver;
    bottom: 0;
    font-size: 1rem;
    left: 0;
    padding: 0.5rem;
    position: absolute;
    top: 0;
    width: 50vw;
`

const Preview = styled.div`
    border-top: 1px solid silver;
    bottom: 0;
    overflow-y: scroll;
    padding: 1rem;
    position: absolute;
    right: 0;
    top: 0;
    width: 50vw;
`

interface Props {
    text: string
    setText: (text: string) => void　
}

export const Editor: React.FC<Props> = (props) => {  //React.FC は 関数コンポーネント（Function Component） の略
    // const [text, setText] = useStateWithStorage('', StorageKey);
    const { text, setText } = props;
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <HeaderArea>
                <Header title="Markdown Editor">
                    <Button onClick={() => setShowModal(true)}>
                        保存する
                    </Button>
                    <Link to="/history">
                        履歴を見る
                    </Link>
                </Header>
            </HeaderArea>
            <Wrapper>
                <TextArea
                    onChange={(event) => setText(event.target.value)}
                    value={text}
                />
                <Preview>
                    <ReactMarkdown remarkPlugins={[gfm]} children={text} />
                </Preview>
            </Wrapper>
            {showModal && (
                <SaveModal
                    onSave={(title: string): void => {
                        putMemo(title, text)
                        setShowModal(false)
                    }}
                    onCancel={() => setShowModal(false)}
                />
            )}
        </>
    )
}