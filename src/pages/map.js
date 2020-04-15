import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import Map, { Marker } from "../components/Map"

import loci from "../components/kanji"
import Popover from 'react-bootstrap/Popover'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import { fitBounds } from 'google-map-react/utils';


const PointMarker = ({ kanji, word, place, nameEn, goTo, style }) => {
    return (
        <Popover 
            placement="top" 
            style={style}
            onClick={kanji ? () => goTo("city", nameEn) : () => goTo("words", place)}>
            <Popover.Content>
                {kanji ? kanji : word }
            </Popover.Content>
        </Popover>
    )
}

const WordMarker = ({ name, word, kana, en, next, prev, style, goTo }) => {
    return (
        <Popover 
            placement="top" 
            style={{...style, overflowWrap: "break-word"}} 
            >
            <Popover.Title as="h1" style={{textAlign: "center", fontSize: "2rem"}}>
                <ruby>{word}<rt>{kana}</rt></ruby>
            </Popover.Title>
            <Popover.Content style={{overflowY: "auto", maxWidth: "100%", fontSize: "2rem" }}>
                {en}
                {/*
                <ButtonGroup>
                    <Button onClick={() => goTo("words", prev.name)} variant="secondary">{prev.name}</Button>
                    <Button onClick={() => goTo("words", next.name)} variant="secondary">{next.name}</Button>
                </ButtonGroup>
                */}
            </Popover.Content>
        </Popover>
    )
}

const CityMarker = ({ kanji, en, reading, name, nameEn, population, next, prev, style, goTo, onClick }) => {
    return <div></div>
    return (
        <Popover 
            placement="top" 
            style={style}>
            <Popover.Content as="h3" onClick={onClick} style={{textAlign: "center"}}>
                {name}<br/>
                {kanji} {en} <br/>{reading.join("; ")}<br/>
                {population + "人"}
            </Popover.Content>
            { next && prev &&
                <Popover.Content>
                    <ButtonGroup>
                        <Button onClick={() => { goTo("city", prev.nameEn) }} variant="secondary">{prev.name}</Button>
                        <Button onClick={() => goTo("words", "")} variant="secondary">{nameEn}</Button>
                        <Button onClick={() => goTo("city", next.nameEn)} variant="secondary">{next.name}</Button>
                    </ButtonGroup>
                </Popover.Content>
            }
        </Popover>
    )
}

const PrefectureMarker = ({ name, kana, nameEn, next, prev, style, goTo }) => {
    return (
        <Popover 
            placement="top" 
            style={{...style, fontSize: "2rem", fontWeight: "bold", color: "#ccc"}}
            onClick={() => goTo("prefecture", nameEn)}> 
            <Popover.Content>
                {kana}
            </Popover.Content>
        </Popover>
    )
}

const cityData = (prefecture) => {
    if (loci[prefecture]) {
        const cities = Object.keys(loci[prefecture]['cities'])
            .map(k => {
                const c = loci[prefecture]['cities'][k]
                return {
                    kanji: c['kanji'],
                    en: c['en'],
                    reading: c['reading'],
                    nameEn: c['name_en'],
                    name: c['name_ja'],
                    population: c['population'],
                    lat: c['lat'],
                    lng: c['lng'],
                    firstWord: (c['words'][0] || {}).kana || ""
                }
            })
        return cities
    }
    return []
}

const wordData = (prefecture, city) => {
    if (loci[prefecture] && loci[prefecture]['cities'][city]) {
        return loci[prefecture]['cities'][city]['words']
    }
    return []
}

const prefectureData = Object.keys(loci).map(k => {
    const city = loci[k]
    return ({
        lat: city.lat,
        lng: city.lng,
        name: city.name,
        nameEn: k,
        kana: city.kana,
    })
})


const MapPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;
    const center = { lat: 35.679835, lng: 139.769099 }
    const zoom = 7
    const prefectureZoom = 10
    const cityZoom = 12
    const wordZoom = 18
    const [state, setState] = useState({
        currentPrefecture: "",
        currentCity: "",
        currentWord: "",
        center: center,
        zoom: zoom,
        size: undefined,
        markers: prefectureData,
        group: "prefecture",
        history: [],
    })
    const [showCity, setShowCity] = useState(-1)
    const [showWord, setShowWord] = useState(-1)

    useEffect(() => {
        goTo("prefecture", "Tokyo")
    }, [])

    const jumpTo = (group, key) => {
        const { prefecture: p, city: c, word: w } = key
        let markers = []
        let target
        let zoom
        if (group == "prefecture") {
            markers = prefectureData
            target = markers.filter(d => d.nameEn === p.nameEn)
            zoom = prefectureZoom
        }
        else if (group == "city") {
            markers = cityData(p.nameEn)
            target = markers.filter(d => d.nameEn === c.nameEn)
            zoom = cityZoom
        }
        else if (group == "words") {
            markers = wordData(p.nameEn, c.nameEn)
            target = markers.filter(d => d.name === w.name)
            zoom = wordZoom
        }

        if (target.length > 0) {
            setState({ ...state,
                group: group,
                currentPrefecture: p,
                currentCity: c,
                currentWord: w,
                markers: markers,
                center: { lat: target[0].lat, lng: target[0].lng },
                zoom: zoom,
            })
        }
    }

    const goTo = (group, key) => {
        let newHistory = state.history
        if (state.currentPrefecture !== "") {
            const curr = {
                "group": state.group,
                "prefecture": state.currentPrefecture,
                "city": state.currentCity,
                "word": state.currentWord,
            }
            if (!state.history.some(c =>
                    curr.group === c.group && curr.prefecture.nameEn === c.prefecture.nameEn &&
                    curr.city.nameEn === c.city.nameEn && curr.word.word === c.word.word)) {
                newHistory = state.history.length < 10 ? [...state.history, curr] : [...state.history.splice(1), curr]
            }
        }

        if (group === "prefecture") {
            setShowCity(-1)
            setShowWord(-1)
            key = key === "" ? state.currentPrefecture.nameEn : key
            const target = prefectureData.filter(d => d.nameEn === key)
            if (target.length > 0) {
                const p = target[0]
                setState({ ...state,
                    center: { lat: p.lat, lng: p.lng },
                    zoom: prefectureZoom,
                    currentPrefecture: { nameEn: key, kana: p.kana, name: p.name, lat: p.lat, lng: p.lng },
                    markers: prefectureData,
                    group: "prefecture",
                    currentCity: "",
                    currentWord: "",
                    history: newHistory,
                })
            }
        }
        else if (group === "city") {
            setShowWord(-1)
            const markers = cityData(state.currentPrefecture.nameEn)
            const city = key === "" ? markers : markers.filter(m => m.nameEn == key)
            if (city.length > 0) {
                setState({ ...state,
                    markers: markers,
                    center: { lat: city[0].lat, lng: city[0].lng },
                    zoom: cityZoom,
                    group: "city",
                    currentCity: city[0],
                    currentWord: "",
                    history: newHistory,
                })
            }
        }
        else if (group === "words") {
            const markers = wordData(state.currentPrefecture.nameEn, state.currentCity.nameEn)
            const word = key === "" ? markers : markers.filter(m => m.name == key)
            if (word.length > 0) {
                const { center, zoom } = fitBounds(word[0].viewport, state.size)
                setState({ ...state,
                    center: center,
                    markers: markers,
                    zoom: zoom,
                    group: "words",
                    currentWord: word[0],
                    history: newHistory,
                })
            }
        }
    }

    const onClick = args => {}

    const onChange = ({ center, zoom, size }) => {
        setState({ ...state, center, zoom, size })
    }

    const Header = () => {
        let txt = ""
        let goToParam = ""
        if (state.group == "prefecture") {
            txt = state.currentPrefecture.nameEn + " : " + state.currentPrefecture.name
        }
        else if (state.group == "city") {
            txt = state.currentCity.nameEn + " : " + state.currentCity.name
        }
        else if (state.group == "words") {
            txt =  state.currentWord.name + " > " + state.currentWord.word
        }
        return (
            <React.Fragment>
                <h4
                    style={{
                        fontFamily: `Montserrat, sans-serif`,
                        margin: 0,
                        padding: 0,
                        textAlign: "right",
                    }}
                >
                    {txt}
                </h4>
                <ButtonGroup style={{ width: "100%", overflowX: "auto"}}>
                    {state.history.map(h => { 
                        const hText = 
                            h.group === "prefecture" ? h.prefecture.name :
                            h.group === "city" ? h.city.name : h.word.word
                        
                        return (
                            <Button 
                                variant="none"
                                onClick={() => jumpTo(h.group, h)} 
                                style={{verticalAlign: "top"}}
                            >{hText}</Button>
                        )
                    })}
                </ButtonGroup>
            </React.Fragment>
        )
    }

    const Footer = () => (
        <ButtonGroup style={{ width: "100%", overflowX: "auto"}}>
            {state.group == "city" &&
                <Button 
                    variant="primary"
                    size="lg"
                    onClick={() => goTo("prefecture", state.currentPrefecture.nameEn)} 
                    style={{verticalAlign: "top"}}
                >up</Button>
            }
            {state.group == "words" &&
                <Button 
                    onClick={() => goTo("city", state.currentCity.nameEn)} 
                    style={{verticalAlign: "top", size:"sm"}}
                >up</Button>
            }
            {state.markers && state.markers.map(m => { 
                let txt = ""
                let goToParam = ""
                if (state.group == "prefecture") {
                    txt = m.kana
                    goToParam = m.nameEn
                } else if (state.group == "city") {
                    txt = m.kanji 
                    goToParam = m.nameEn
                } else if (state.group == "words") {
                    txt = m.en 
                    goToParam = m.name
                }
                return <Button onClick={() => goTo(state.group, goToParam)} style={{verticalAlign: "top", size:"sm"}}>{txt}</Button> 
            })}
        </ButtonGroup>
    )

    return (
        <Layout location={location} title={siteTitle} header={<Header />} footer={<Footer />}>
            <div style={{ height: '100%', width: '100%' }}>
                <Map 
                    onClick={onClick} 
                    onChange={onChange} 
                    center={state.center} 
                    zoom={state.zoom}>
                    {state.markers.map((d,i) => { 
                        if (state.group === "prefecture") {
                            return (
                                <PrefectureMarker 
                                    lat={d.lat} 
                                    lng={d.lng} 
                                    name={d.name} 
                                    nameEn={d.nameEn} 
                                    prev={prefectureData[(i - 1) > 0 ? i - 1 : prefectureData.length - 1]}
                                    next={prefectureData[(i + 1) % prefectureData.length]}
                                    kana={d.kana} 
                                    goTo={goTo}
                                    style={{ transform: `translate(0%,-80%) scale(${cityZoom - state.zoom < 1 ? 0 : (state.zoom / (1.5 * prefectureZoom)) }`}}
                                    
                                />
                            )
                        } else if (state.group === "city" && d.nameEn === state.currentCity.nameEn) {
                            return (
                                <CityMarker
                                    kanji={d.kanji}
                                    en={d.en}
                                    reading={d.reading}
                                    lat={d.lat} 
                                    lng={d.lng} 
                                    name={d.name}
                                    nameEn={d.nameEn} 
                                    population={d.population}
                                    prev={state.markers[(i - 1) > 0 ? i - 1 : state.markers.length - 1]}
                                    next={state.markers[(i + 1) % state.markers.length]}
                                    goTo={goTo}
                                    style={{ transform: `translate(0%,-80%) scale(${Math.abs(cityZoom - state.zoom) < 3 ? 1 : 0}`}}
                                />
                            )
                        } else if (state.group === "words" && d.word === state.currentWord.word) {
                            return (
                                <WordMarker
                                    lat={d.lat} 
                                    lng={d.lng} 
                                    name={d.name}
                                    kana={d.kana}
                                    en={d.en}
                                    word={d.word}
                                    prev={state.markers[(i - 1) > 0 ? i - 1 : state.markers.length - 1]}
                                    next={state.markers[(i + 1) % state.markers.length]}
                                    goTo={goTo}
                                    style={{ transform: `translate(0%,-80%) scale(${wordZoom - state.zoom > -1 ? (wordZoom / (2 * state.zoom)) : 0 })`}}
                                />
                            )
                        }
                    })}
                    {state.group == "prefecture" && 
                        Object.values(cityData(state.currentPrefecture.nameEn))
                            .map((m, i) => {
                                if (i == showCity) {
                                    return (
                                        <CityMarker
                                            kanji={m.kanji}
                                            reading={m.reading}
                                            en={m.en}
                                            lat={m.lat} 
                                            lng={m.lng} 
                                            name={m.name_ja}
                                            nameEn={m.nameEn} 
                                            population={m.population}
                                            goTo={goTo}
                                            style={{ transform: "translate(0%,-100%)"}}
                                            onClick={() => goTo("city", m.nameEn)}
                                        />
                                    )
                                }
                                return (
                                    <PointMarker 
                                        lat={m.lat} 
                                        lng={m.lng} 
                                        kanji={m.kanji}
                                        nameEn={m.nameEn}
                                        goTo={goTo}
                                        style={{ transform: `translate(-50%, -50%) scale(${Math.abs(prefectureZoom - state.zoom) < 3 ? 1 : 0}`}}
                                    />
                                )
                            })
                    }
                    {state.group == "city" && 
                        wordData(state.currentPrefecture.nameEn, state.currentCity.nameEn)
                            .map((m, i) => {
                                if (i == showWord) {
                                    return (
                                        <WordMarker
                                            lat={m.lat} 
                                            lng={m.lng} 
                                            name={m.name}
                                            kana={m.kana}
                                            en={m.en}
                                            goTo={goTo}
                                            style={{ transform: "translate(0%,-100%)"}}
                                            onClick={() => goTo("words", m.name)}
                                        />
                                    )
                                }
                                return (
                                    <PointMarker 
                                        lat={m.lat} 
                                        lng={m.lng} 
                                        word={m.word}
                                        goTo={goTo}
                                        place={m.name}
                                        style={{ transform: `translate(-0%, -100%) scale(${ cityZoom - state.zoom > 2 ? 0 : 1.3 * cityZoom / state.zoom})`}}
                                    />
                                )
                            })
                    }
                </Map>
            </div>
      </Layout>
    );
}

export default MapPage;

export const pageQuery = graphql `
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
