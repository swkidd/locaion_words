import React, { Component, useState } from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout"
import Map, { Marker } from "../components/Map"

import loci from "../components/loci"
import Popover from 'react-bootstrap/Popover'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const WordMarker = ({name, word, kana, en, next, prev, style, goTo}) => {
    return ( 
        <Popover 
            placement="top" 
            style={style} 
            >
            <Popover.Title as="h1" style={{textAlign: "center", fontSize: "2rem"}}>
                <ruby>{word}<rt>{kana}</rt></ruby>
            </Popover.Title>
            <Popover.Content style={{ width: "10em" }}>
            {/*
                <ButtonGroup>
                    <Button onClick={() => goTo("words", prev.name)} variant="secondary">{prev.name}</Button>
                    <Button onClick={() => goTo("words", next.name)} variant="secondary">{next.name}</Button>
                </ButtonGroup>
            */}
                {en}
            </Popover.Content>
        </Popover>
    )
}

const CityMarker = ({name, nameEn, population, next, prev, style, goTo}) => {
    return ( 
        <Popover 
            placement="top" 
            style={style}>
            <Popover.Title as="h3" style={{textAlign: "center"}}>
                {name}<br/>
                {population}人
            </Popover.Title>
            <Popover.Content>
                <ButtonGroup>
                    <Button onClick={() => goTo("city", prev.nameEn)} variant="secondary">{prev.name}</Button>
                    <Button onClick={() => goTo("words", "")} variant="secondary">{nameEn}</Button>
                    <Button onClick={() => goTo("city", next.nameEn)} variant="secondary">{next.name}</Button>
                </ButtonGroup>
            </Popover.Content>
        </Popover>
    )
}

const PrefectureMarker = ({name, kana, nameEn, next, prev, style, goTo}) => {
    return ( 
        <Popover 
            placement="top" 
            style={style}>
            <Popover.Title as="h3" style={{textAlign: "center"}}>
                {nameEn}
            </Popover.Title>
            <Popover.Content>
                <ButtonGroup>
                    <Button onClick={() => goTo("prefecture", prev.nameEn)} variant="secondary">{prev.name}</Button>
                    <Button onClick={() => goTo("city", "")} variant="success">{kana}</Button>
                    <Button onClick={() => goTo("prefecture", next.nameEn)} variant="secondary">{next.name}</Button>
                </ButtonGroup>
            </Popover.Content>
        </Popover>
    )
}

const cityData = (prefecture) => {
    if (loci[prefecture]) {
        const cities = Object.keys(loci[prefecture])
            .filter(k => loci[prefecture][k]['name_en'])
            .map(k => {
                const c = loci[prefecture][k]
                return {
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
    return loci[prefecture][city]['words']
}

const prefectureData = Object.keys(loci).map(k => { 
    const city = loci[k]
    return (
        {
            lat: parseFloat(city.lat),
            lng: parseFloat(city.lng),
            name: city.name,
            nameEn: k,
            kana: city.kana,
        }
    )
})

const onClick = args => console.log(args)

const MapPage = ({ data, location }) => {
    const siteTitle = data.site.siteMetadata.title;
    const center = { lat: 35.679835, lng: 139.769099 }
    const zoom = 7 
    const prefectureZoom = 7 
    const cityZoom = 15 
    const wordZoom = 19 
    const [state, setState] = useState({
        currentPrefecture: "Tokyo",
        currentCity: "",
        center: center,
        zoom: zoom,
        markers: prefectureData,
        group: "prefecture",
    })
    
    const goTo = (group, key) => {
        if (group === "prefecture") {
            const target = prefectureData.filter(d => d.nameEn === key)
            if (target.length > 0) {
                setState({...state,
                    center: { lat: target[0].lat, lng: target[0].lng }, 
                    zoom: prefectureZoom,
                    currentPrefecture: key,
                    markers: prefectureData,
                    group: "prefecture",
                })             
            }
        } else if (group === "city") {
            if (state.group !== "city") {
                const markers = cityData(state.currentPrefecture) 
                if (markers.length === 0) return
                setState({...state,
                    markers: markers,
                    center: { lat: parseFloat(markers[0].lat), lng: parseFloat(markers[0].lng) },
                    zoom: cityZoom,
                    group: "city",
                    currentCity: markers[0].nameEn 
                })
            } else {
                const city = state.markers.filter(m => m.nameEn == key)
                if (city.length > 0) {
                    setState({...state,
                        center: { lat: parseFloat(city[0].lat), lng: parseFloat(city[0].lng) },
                        zoom: cityZoom,
                        group: "city",
                        currentCity: key
                    })
                }
            }
        } else if (group === "words") {
            if (state.group !== "words") {
                const markers = wordData(state.currentPrefecture, state.currentCity) 
                if (markers.length === 0) return
                setState({...state,
                    markers: markers,
                    center: { lat: parseFloat(markers[0].lat), lng: parseFloat(markers[0].lng) },
                    zoom: wordZoom,
                    group: "words",
                })
            } else {
                const word = state.markers.filter(m => m.name == key)
                if (word.length > 0) {
                    setState({...state,
                        center: { lat: parseFloat(word[0].lat), lng: parseFloat(word[0].lng) },
                        zoom: wordZoom,
                        group: "words",
                    })
                }
            }
        }
    }
   
    const onChange = ({ center, zoom, bounds, marginBounds }) => {
        setState({...state, center, zoom }) 
        console.log(state.markers)
    }
    
    return (
        <Layout location={location} title={siteTitle}>
            <div style={{ height: '100%', width: '100%' }}>
                <Map 
                    onClick={onClick} 
                    onChange={onChange} 
                    center={state.center} 
                    zoom={state.zoom}>
                    {state.markers.map((d,i) => { 
                        if (state.group === "prefecture" && state.currentPrefecture === d.nameEn) {
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
                                    style={{ transform: "translate(0%,-100%)"}}
                                />
                            )
                        } else if (state.group === "city") {
                            return (
                                <CityMarker
                                    lat={d.lat} 
                                    lng={d.lng} 
                                    name={d.name}
                                    nameEn={d.nameEn} 
                                    population={d.population}
                                    prev={state.markers[(i - 1) > 0 ? i - 1 : state.markers.length - 1]}
                                    next={state.markers[(i + 1) % state.markers.length]}
                                    goTo={goTo}
                                    style={{ transform: "translate(0%,-100%)"}}
                                />
                            )
                        } else if (state.group === "words") {
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
                                    style={{ transform: "translate(-50%,-50%)"}}
                                />
                            )
                        }
                    })}
                </Map>
            </div>
            <ButtonGroup style={{ width: "100%", overflowX: "auto"}}>
                {state.group == "city" &&
                    <Button 
                        onClick={() => goTo("prefecture", state.currentPrefecture)} 
                        style={{verticalAlign: "top", size:"sm"}}
                    >up</Button>
                }
                {state.group == "words" &&
                    <Button 
                        onClick={() => goTo("city", state.currentCity)} 
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
                        txt = m.firstWord.substring(0,2)
                        goToParam = m.nameEn
                    } else if (state.group == "words") {
                        txt = m.word[0]
                        goToParam = m.name
                    }
                    return <Button onClick={() => goTo(state.group, goToParam)} style={{verticalAlign: "top", size:"sm"}}>{txt}</Button> 
                })}
            </ButtonGroup>
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
