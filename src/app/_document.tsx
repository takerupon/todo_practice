import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render() {
        return (
        <Html lang="ja">
            <Head>
            {/* ここにメタタグやリンクタグなどを追加 */}
            </Head>
            <body>
            {/* ここでカスタムスクリプトなどを追加することも可能 */}
            <Main />
            <NextScript />
            </body>
        </Html>
        )
    }
    }

export default MyDocument
