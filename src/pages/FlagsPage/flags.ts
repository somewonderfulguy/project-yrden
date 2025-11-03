import alabamaVertexShader from './shaders/alabama/vertex.glsl'
import alabamaFragmentShader from './shaders/alabama/fragment.glsl'
import arkansasVertexShader from './shaders/arkansas/vertex.glsl'
import arkansasFragmentShader from './shaders/arkansas/fragment.glsl'
import bosniaAndHerzegovinaVertexShader from './shaders/bosnia-and-herzegovina/vertex.glsl'
import bosniaAndHerzegovinaFragmentShader from './shaders/bosnia-and-herzegovina/fragment.glsl'
import canadaVertexShader from './shaders/canada/vertex.glsl'
import canadaFragmentShader from './shaders/canada/fragment.glsl'
import coloradoVertexShader from './shaders/colorado/vertex.glsl'
import coloradoFragmentShader from './shaders/colorado/fragment.glsl'
import czechiaVertexShader from './shaders/czechia/vertex.glsl'
import czechiaFragmentShader from './shaders/czechia/fragment.glsl'
import denmarkVertexShader from './shaders/denmark/vertex.glsl'
import denmarkFragmentShader from './shaders/denmark/fragment.glsl'
import estoniaVertexShader from './shaders/estonia/vertex.glsl'
import estoniaFragmentShader from './shaders/estonia/fragment.glsl'
import finlandVertexShader from './shaders/finland/vertex.glsl'
import finlandFragmentShader from './shaders/finland/fragment.glsl'
import franceVertexShader from './shaders/france/vertex.glsl'
import franceFragmentShader from './shaders/france/fragment.glsl'
import georgiaVertexShader from './shaders/georgia/vertex.glsl'
import georgiaFragmentShader from './shaders/georgia/fragment.glsl'
import greenlandVertexShader from './shaders/greenland/vertex.glsl'
import greenlandFragmentShader from './shaders/greenland/fragment.glsl'
import hongKongVertexShader from './shaders/hong-kong/vertex.glsl'
import hongKongFragmentShader from './shaders/hong-kong/fragment.glsl'
import icelandVertexShader from './shaders/iceland/vertex.glsl'
import icelandFragmentShader from './shaders/iceland/fragment.glsl'
import irelandVertexShader from './shaders/ireland/vertex.glsl'
import irelandFragmentShader from './shaders/ireland/fragment.glsl'
import israelVertexShader from './shaders/israel/vertex.glsl'
import israelFragmentShader from './shaders/israel/fragment.glsl'
import italyVertexShader from './shaders/italy/vertex.glsl'
import italyFragmentShader from './shaders/italy/fragment.glsl'
import latviaVertexShader from './shaders/latvia/vertex.glsl'
import latviaFragmentShader from './shaders/latvia/fragment.glsl'
import lithuaniaVertexShader from './shaders/lithuania/vertex.glsl'
import lithuaniaFragmentShader from './shaders/lithuania/fragment.glsl'
import monacoVertexShader from './shaders/monaco/vertex.glsl'
import monacoFragmentShader from './shaders/monaco/fragment.glsl'
import newMexicoVertexShader from './shaders/new-mexico/vertex.glsl'
import newMexicoFragmentShader from './shaders/new-mexico/fragment.glsl'
import northMacedoniaVertexShader from './shaders/north-macedonia/vertex.glsl'
import northMacedoniaFragmentShader from './shaders/north-macedonia/fragment.glsl'
import norwayVertexShader from './shaders/norway/vertex.glsl'
import norwayFragmentShader from './shaders/norway/fragment.glsl'
import polandVertexShader from './shaders/poland/vertex.glsl'
import polandFragmentShader from './shaders/poland/fragment.glsl'
import quatarVertexShader from './shaders/quatar/vertex.glsl'
import quatarFragmentShader from './shaders/quatar/fragment.glsl'
import quebecVertexShader from './shaders/quebec/vertex.glsl'
import quebecFragmentShader from './shaders/quebec/fragment.glsl'
import swedenVertexShader from './shaders/sweden/vertex.glsl'
import swedenFragmentShader from './shaders/sweden/fragment.glsl'
import taiwanVertexShader from './shaders/taiwan/vertex.glsl'
import taiwanFragmentShader from './shaders/taiwan/fragment.glsl'
import texasVertexShader from './shaders/texas/vertex.glsl'
import texasFragmentShader from './shaders/texas/fragment.glsl'
import turkiyeVertexShader from './shaders/turkiye/vertex.glsl'
import turkiyeFragmentShader from './shaders/turkiye/fragment.glsl'
import ukVertexShader from './shaders/uk/vertex.glsl'
import ukFragmentShader from './shaders/uk/fragment.glsl'
import ukraineVertexShader from './shaders/ukraine/vertex.glsl'
import ukraineFragmentShader from './shaders/ukraine/fragment.glsl'
import usaVertexShader from './shaders/usa/vertex.glsl'
import usaFragmentShader from './shaders/usa/fragment.glsl'

type Dimensions = [number, number]

export const FLAGS = {
  Alabama: {
    vs: alabamaVertexShader,
    fs: alabamaFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Arkansas: {
    vs: arkansasVertexShader,
    fs: arkansasFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  'Bosnia and Herzegovina': {
    vs: bosniaAndHerzegovinaVertexShader,
    fs: bosniaAndHerzegovinaFragmentShader,
    dimensions: [2, 1] as Dimensions,
  },
  Canada: {
    vs: canadaVertexShader,
    fs: canadaFragmentShader,
    dimensions: [2, 1] as Dimensions,
  },
  Colorado: {
    vs: coloradoVertexShader,
    fs: coloradoFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Czechia: {
    vs: czechiaVertexShader,
    fs: czechiaFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Denmark: {
    vs: denmarkVertexShader,
    fs: denmarkFragmentShader,
    dimensions: [37 / 28, 1] as Dimensions,
  },
  Estonia: {
    vs: estoniaVertexShader,
    fs: estoniaFragmentShader,
    dimensions: [11 / 7, 1] as Dimensions,
  },
  Finland: {
    vs: finlandVertexShader,
    fs: finlandFragmentShader,
    dimensions: [18 / 11, 1] as Dimensions,
  },
  France: {
    vs: franceVertexShader,
    fs: franceFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Georgia: {
    vs: georgiaVertexShader,
    fs: georgiaFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Greenland: {
    vs: greenlandVertexShader,
    fs: greenlandFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  'Hong Kong': {
    vs: hongKongVertexShader,
    fs: hongKongFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Iceland: {
    vs: icelandVertexShader,
    fs: icelandFragmentShader,
    dimensions: [25 / 18, 1] as Dimensions,
  },
  Ireland: {
    vs: irelandVertexShader,
    fs: irelandFragmentShader,
    dimensions: [2, 1] as Dimensions,
  },
  Israel: {
    vs: israelVertexShader,
    fs: israelFragmentShader,
    dimensions: [11 / 8, 1] as Dimensions,
  },
  Italy: {
    vs: italyVertexShader,
    fs: italyFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Latvia: {
    vs: latviaVertexShader,
    fs: latviaFragmentShader,
    dimensions: [2, 1] as Dimensions,
  },
  Lithuania: {
    vs: lithuaniaVertexShader,
    fs: lithuaniaFragmentShader,
    dimensions: [5 / 3, 1] as Dimensions,
  },
  Monaco: {
    vs: monacoVertexShader,
    fs: monacoFragmentShader,
    dimensions: [1.25, 1] as Dimensions,
  },
  'New Mexico': {
    vs: newMexicoVertexShader,
    fs: newMexicoFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  'North Macedonia': {
    vs: northMacedoniaVertexShader,
    fs: northMacedoniaFragmentShader,
    dimensions: [2, 1] as Dimensions,
  },
  Norway: {
    vs: norwayVertexShader,
    fs: norwayFragmentShader,
    dimensions: [22 / 16, 1] as Dimensions,
  },
  Poland: {
    vs: polandVertexShader,
    fs: polandFragmentShader,
    dimensions: [1.6, 1] as Dimensions,
  },
  Qatar: {
    vs: quatarVertexShader,
    fs: quatarFragmentShader,
    dimensions: [28 / 11, 1] as Dimensions,
  },
  Quebec: {
    vs: quebecVertexShader,
    fs: quebecFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Sweden: {
    vs: swedenVertexShader,
    fs: swedenFragmentShader,
    dimensions: [1.6, 1] as Dimensions,
  },
  Taiwan: {
    vs: taiwanVertexShader,
    fs: taiwanFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Texas: {
    vs: texasVertexShader,
    fs: texasFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  Türkiye: {
    vs: turkiyeVertexShader,
    fs: turkiyeFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  UK: {
    vs: ukVertexShader,
    fs: ukFragmentShader,
    dimensions: [1.6, 1] as Dimensions,
  },
  Ukraine: {
    vs: ukraineVertexShader,
    fs: ukraineFragmentShader,
    dimensions: [1.5, 1] as Dimensions,
  },
  USA: {
    vs: usaVertexShader,
    fs: usaFragmentShader,
    dimensions: [1.9, 1] as Dimensions,
  },
} as const

export type Flag = keyof typeof FLAGS
export const flagOptions = Object.keys(FLAGS).sort() as Array<Flag>
