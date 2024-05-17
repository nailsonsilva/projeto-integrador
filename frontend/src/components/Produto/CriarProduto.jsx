import { Button, CloseButton } from '@chakra-ui/react'
import React from 'react'
import { useState, useRef } from 'react';
import { errorNotification, successNotification } from '../../services/notification';
import { addImage, createProduct } from '../../services/products';

export default function CriarProduto({ isOpen, setModalOpen }) {
    const categorias = ["", "Limpeza", "Alimentos", "Higiene", "Bebida"];
    const [file, setFile] = useState(null);
    const inputRef = useRef();

    const [product, setProduct] = useState({
        nome: "",
        preco: 0,
        tipo: "",
        descricao: "",
        imagem: null,
        vendedor: "",
        quantidade: 0
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "preco") {
            const sanitizedValue = value.replace(/[^0-9.]/g, '');
            const formattedValue = parseFloat(sanitizedValue).toFixed(2);
            setProduct({
                ...product,
                [name]: formattedValue
            })
        } else {
            setProduct({
                ...product,
                [name]: value
            })
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
        setProduct({
            ...product,
            imagem: e.dataTransfer.files[0].name
        })
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    const handleSubmit = (e) => {
        if (!product.descricao || !product.nome || !product.descricao ||
            !product.preco || !product.imagem || !product.quantidade
        ) {
            errorNotification("Atenção", "Todos os campos são obrigatórios")
            return;
        }
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user.nome)

        setProduct({
            ...product,
            quantidade: parseInt(product.quantidade)
        });

        createProduct(product, user.nome).then(response => {
            if (response) {
                addImage(file, response.data._id);
                setModalOpen(!isOpen)
                successNotification("Sucesso", "Produto cadastrado com sucesso")
            }
        }, error => {
            console.log(error)
            errorNotification("Atenção", error.message)
        });
    };

    if (isOpen) {
        return (
            <div style={BACKGROUND_STYLE}>
                <div style={FORM_STYLE}>
                    <div style={FORM_TITLE}>
                        <h3>ADICIONAR PRODUTO</h3>
                        <CloseButton onClick={setModalOpen} />
                    </div>
                    <form style={FORM_MAIN}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <div style={FORM_MAIN_LEFT}>
                                <div style={FORM_INFO_PRODUCT}>
                                    <label htmlFor='nome' style={{ marginTop: '10px' }}>Nome</label>
                                    <input name='nome' value={product.name} type='text' onChange={handleChange} style={{ border: 'solid 1px #B8BDC9', width: "220px" }}></input>
                                </div>
                                <div style={FORM_INFO_PRODUCT}>
                                    <label htmlFor='tipo' style={{ marginTop: '10px' }}>Categoria</label>
                                    <select name='tipo' value={product.tipo} type='text' onChange={handleChange} style={{ border: 'solid 1px #B8BDC9', width: "220px" }}>
                                        {
                                            categorias.map(categoria => {
                                                return <option value={categoria}>{categoria}</option>
                                            })
                                        }
                                    </select>
                                </div>
                                <div style={FORM_INFO_PRODUCT}>
                                    <label htmlFor='descricao' style={{ marginTop: '10px' }}>Descrição</label>
                                    <input name='descricao' value={product.descricao} type='text' onChange={handleChange} style={{ border: 'solid 1px #B8BDC9', width: "220px" }}></input>
                                </div>
                                <div style={FORM_INFO_PRODUCT}>
                                    <label htmlFor='quantidade' style={{ marginTop: '10px' }}>Quantidade</label>
                                    <input name='quantidade' value={product.quantidade} type='text' onChange={handleChange} style={{ border: 'solid 1px #B8BDC9', width: "220px" }}></input>
                                </div>
                            </div>
                            <div style={FORM_MAIN_RIGHT}>
                                <div style={FORM_INFO_PRODUCT}>
                                    <label htmlFor='imagem' style={{ marginTop: '10px' }}>Imagem</label>
                                    {
                                        !file &&
                                        <div style={FORM_DROP_ZONE} onDragOver={handleDragOver} onDrop={handleDrop}>
                                            <svg fill="#b3b3b3" width="34px" height="34px" viewBox="0 -1.5 35 35" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#b3b3b3">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                                <g id="SVGRepo_iconCarrier"> <title>upload</title> <path d="M29.426 15.535c0 0 0.649-8.743-7.361-9.74-6.865-0.701-8.955 5.679-8.955 5.679s-2.067-1.988-4.872-0.364c-2.511 1.55-2.067 4.388-2.067 4.388s-5.576 1.084-5.576 6.768c0.124 5.677 6.054 5.734 6.054 5.734h9.351v-6h-3l5-5 5 5h-3v6h8.467c0 0 5.52 0.006 6.295-5.395 0.369-5.906-5.336-7.070-5.336-7.070z" /> </g>
                                            </svg>
                                            <h1> Drag and drop file here</h1>
                                            <input type='file' accept='image/*' name="imagem" multiple onChange={(e) => { setFile(e.target.files[0]); handleChange(e) }} hidden ref={inputRef} />
                                            <Button style={{ backgroundColor: "transparent" }} onClick={() => { inputRef.current.click(); }}>Selecione um arquivo</Button>
                                        </div>
                                    }
                                    {
                                        file &&
                                        <div style={FORM_IMAGE_INFO}>
                                            <p>{file.name}</p>
                                            <svg style={{ marginLeft: "10px" }} onClick={() => { setFile(null); }} width="16px" height="16px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                                                <title>cancel</title>
                                                <desc>Created with Sketch.</desc>
                                                <defs>
                                                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1">
                                                        <stop stop-color="#FC4343" offset="0%">
                                                        </stop>
                                                        <stop stop-color="#F82020" offset="100%">
                                                        </stop>
                                                    </linearGradient>
                                                </defs>
                                                <g id="icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                    <g id="ui-gambling-website-lined-icnos-casinoshunter" transform="translate(-868.000000, -1910.000000)" fill="url(#linearGradient-1)" fill-rule="nonzero">
                                                        <g id="4" transform="translate(50.000000, 1871.000000)">
                                                            <path d="M821.426657,39.5856848 L830.000001,48.1592624 L838.573343,39.5856848 C839.288374,38.8706535 840.421422,38.8040611 841.267835,39.4653242 L841.414315,39.5987208 C842.195228,40.3796338 842.195228,41.645744 841.414306,42.4266667 L832.840738,51 L841.414315,59.5733429 C842.129347,60.2883742 842.195939,61.4214224 841.534676,62.2678347 L841.401279,62.4143152 C840.620366,63.1952283 839.354256,63.1952283 838.573333,62.4143055 L830.000001,53.8407376 L821.426657,62.4143152 C820.711626,63.1293465 819.578578,63.1959389 818.732165,62.5346758 L818.585685,62.4012792 C817.804772,61.6203662 817.804772,60.354256 818.585694,59.5733333 L827.159262,51 L818.585685,42.4266571 C817.870653,41.7116258 817.804061,40.5785776 818.465324,39.7321653 L818.598721,39.5856848 C819.379634,38.8047717 820.645744,38.8047717 821.426657,39.5856848 Z M820.028674,61.999873 C820.023346,61.9999577 820.018018,62 820.012689,62 Z M820.161408,61.9889406 L820.117602,61.9945129 L820.117602,61.9945129 C820.132128,61.9929912 820.146788,61.9911282 820.161408,61.9889406 Z M819.865274,61.9891349 L819.883098,61.9916147 C819.877051,61.9908286 819.87101,61.9899872 819.864975,61.9890905 L819.865274,61.9891349 Z M819.739652,61.9621771 L819.755271,61.9664589 C819.749879,61.9650278 819.744498,61.9635509 819.739126,61.9620283 L819.739652,61.9621771 Z M820.288411,61.9614133 L820.234515,61.9752112 L820.234515,61.9752112 C820.252527,61.971132 820.270527,61.9665268 820.288411,61.9614133 Z M820.401572,61.921544 L820.359957,61.9380009 L820.359957,61.9380009 C820.373809,61.9328834 820.387743,61.9273763 820.401572,61.921544 Z M819.623655,61.9214803 C819.628579,61.923546 819.626191,61.9225499 819.623806,61.921544 L819.623655,61.9214803 Z M819.506361,61.8625673 L819.400002,61.7903682 C819.444408,61.8248958 819.491056,61.8551582 819.539393,61.8811554 L819.506361,61.8625673 L819.506361,61.8625673 Z M820.51858,61.8628242 L820.486378,61.8809439 L820.486378,61.8809439 C820.496939,61.8752641 820.507806,61.8691536 820.51858,61.8628242 Z M840.881155,61.4606074 L840.862567,61.4936392 L840.862567,61.4936392 L840.790368,61.5999978 C840.824896,61.555592 840.855158,61.5089438 840.881155,61.4606074 Z M840.936494,61.3386283 L840.92148,61.3763453 L840.92148,61.3763453 C840.926791,61.3637541 840.931774,61.3512293 840.936494,61.3386283 Z M840.974777,61.2110466 L840.962177,61.2603479 L840.962177,61.2603479 C840.966711,61.2443555 840.97096,61.2277405 840.974777,61.2110466 Z M840.994445,61.0928727 L840.989135,61.1347261 L840.989135,61.1347261 C840.991174,61.1210064 840.992958,61.1069523 840.994445,61.0928727 Z M839.987311,40.9996529 L830,50.9872374 L820.012689,40.9996529 L819.999653,41.0126889 L829.987237,51 L819.999653,60.9873111 L820.012689,61.0003471 L830,51.0127626 L839.987311,61.0003471 L840.000347,60.9873111 L830.012763,51 L840.000347,41.0126889 L839.987311,40.9996529 Z M840.999873,60.9713258 L840.999916,61.0003193 L840.999916,61.0003193 C841.000041,60.9907089 841.000027,60.9810165 840.999873,60.9713258 Z M840.988941,60.8385918 L840.994513,60.8823981 L840.994513,60.8823981 C840.992991,60.8678719 840.991128,60.8532122 840.988941,60.8385918 Z M840.961413,60.7115886 L840.975211,60.7654853 L840.975211,60.7654853 C840.971132,60.7474727 840.966527,60.7294733 840.961413,60.7115886 Z M840.921544,60.5984278 L840.938001,60.6400431 L840.938001,60.6400431 C840.932883,60.6261908 840.927376,60.612257 840.921544,60.5984278 Z M840.862824,60.4814199 L840.880944,60.5136217 L840.880944,60.5136217 C840.875264,60.503061 840.869154,60.4921939 840.862824,60.4814199 Z M819.119056,41.4863783 L819.134164,41.5134185 C819.128903,41.5043379 819.123796,41.4951922 819.118845,41.4859852 L819.119056,41.4863783 Z M819.061999,41.3599569 L819.075467,41.3944079 C819.070734,41.3829341 819.066223,41.3713901 819.061935,41.3597825 L819.061999,41.3599569 Z M819.024789,41.2345147 L819.033541,41.2701072 C819.030397,41.2582611 819.027473,41.2463686 819.024771,41.234436 L819.024789,41.2345147 Z M819.005077,41.1136164 L819.008385,41.1422797 C819.007138,41.1326872 819.00603,41.12308 819.005061,41.1134615 L819.005077,41.1136164 Z M819.000419,40.9836733 L819,41.0126889 C819,41.002956 819.000141,40.993223 819.000424,40.9834934 L819.000419,40.9836733 Z M819.010865,40.8652739 L819.008385,40.8830981 C819.009171,40.8770511 819.010013,40.8710099 819.010909,40.8649753 L819.010865,40.8652739 Z M819.037823,40.7396521 L819.033541,40.7552707 C819.034972,40.7498794 819.036449,40.7444978 819.037972,40.7391264 L819.037823,40.7396521 Z M819.07852,40.6236547 C819.076454,40.6285788 819.07745,40.6261907 819.078456,40.6238057 L819.07852,40.6236547 Z M819.137433,40.5063608 L819.209632,40.4000022 C819.175104,40.444408 819.144842,40.4910562 819.118845,40.5393926 L819.137433,40.5063608 L819.137433,40.5063608 Z M820.485985,40.1188446 L820.519017,40.1374327 L820.519017,40.1374327 L820.625376,40.2096318 C820.58097,40.1751042 820.534322,40.1448418 820.485985,40.1188446 Z M839.513622,40.1190561 L839.486582,40.1341644 C839.495662,40.128903 839.504808,40.1237964 839.514015,40.1188446 L839.513622,40.1190561 Z M819.539,40.1190561 L819.511959,40.1341644 C819.52104,40.128903 819.530186,40.1237964 819.539393,40.1188446 L819.539,40.1190561 Z M840.460607,40.1188446 L840.493639,40.1374327 L840.493639,40.1374327 L840.599998,40.2096318 C840.555592,40.1751042 840.508944,40.1448418 840.460607,40.1188446 Z M819.661418,40.0634885 L819.63097,40.0754675 C819.641051,40.0713084 819.651187,40.0673212 819.661372,40.0635059 L819.661418,40.0634885 Z M820.359783,40.0619346 L820.401723,40.0785197 L820.401723,40.0785197 C820.387743,40.0726237 820.373809,40.0671166 820.359783,40.0619346 Z M839.640043,40.0619991 L839.605592,40.0754675 C839.617066,40.0707338 839.62861,40.0662229 839.640217,40.0619346 L839.640043,40.0619991 Z M840.338628,40.0635059 L840.376345,40.0785197 L840.376345,40.0785197 C840.363754,40.0732095 840.351229,40.0682261 840.338628,40.0635059 Z M819.789259,40.0251536 L819.755271,40.0335411 C819.766459,40.0305713 819.777688,40.0277987 819.788953,40.0252234 L819.789259,40.0251536 Z M820.234436,40.0247709 L820.288548,40.0386257 L820.288548,40.0386257 C820.270527,40.0334732 820.252527,40.028868 820.234436,40.0247709 Z M839.765485,40.0247888 L839.729893,40.0335411 C839.741739,40.0303966 839.753631,40.0274732 839.765564,40.0247709 L839.765485,40.0247888 Z M840.211047,40.0252234 L840.260348,40.0378229 L840.260348,40.0378229 C840.244356,40.0332892 840.227741,40.0290398 840.211047,40.0252234 Z M819.911404,40.0051132 L819.883098,40.0083853 C819.892432,40.0071719 819.901779,40.0060902 819.911137,40.0051402 L819.911404,40.0051132 Z M820.113462,40.0050614 L820.161342,40.0110494 L820.161342,40.0110494 C820.145468,40.0086743 820.12948,40.006675 820.113462,40.0050614 Z M839.886384,40.005077 L839.85772,40.0083853 C839.867313,40.0071382 839.87692,40.0060303 839.886538,40.0050614 L839.886384,40.005077 Z M840.088863,40.0051402 L840.134726,40.0108651 L840.134726,40.0108651 C840.119676,40.0086288 840.104284,40.0067057 840.088863,40.0051402 Z M839.95834,40.0004173 L840.016507,40.0004238 C839.997122,39.9998609 839.977725,39.9998588 839.95834,40.0004173 Z M819.983493,40.0004238 L820.04166,40.0004173 C820.022275,39.9998588 820.002878,39.9998609 819.983493,40.0004238 Z" id="cancel">
                                                            </path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </div>
                                    }
                                </div>
                                <div style={FORM_INFO_PRODUCT}>
                                    <label htmlFor='preco' style={{ marginTop: '10px' }}>Valor</label>
                                    <input name='preco' value={product.preco} placeholder="0.00" type='text' onChange={handleChange} style={{ border: 'solid 1px #B8BDC9', width: "220px" }}></input>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button style={{ backgroundColor: "rgb(142, 172, 80)", color: "white", width: "15vw", position: "relative" }} onClick={() => { handleSubmit(); }}>Confirmar</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return null
}
const FORM_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '750px',
    height: '550px',
    backgroundColor: '#fff',
    borderRadius: '12px',
}
const BACKGROUND_STYLE = {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgb(0,0,0,0.7)',
    zIndex: '1000'
}
const FORM_TITLE = {
    backgroundColor: '#8EAC50',
    padding: '20px',
    borderRadius: '12px 12px 0px 0px',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between'
}
const FORM_MAIN = {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: "75%",
    alignItems: "space-between"
}
const FORM_MAIN_LEFT = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: "column",
    width: "40%"
}
const FORM_MAIN_RIGHT = {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: "column",
    width: "40%"
}

const FORM_INFO_PRODUCT = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "30px"
}
const FORM_IMAGE_INFO = {
    display: "flex",
    flexDirection: "column",
}

const FORM_DROP_ZONE = {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
    height: "120px",
    width: "250px",
    border: "2px dashed #8EAC50"
}
