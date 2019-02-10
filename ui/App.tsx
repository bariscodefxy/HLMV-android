import * as leetModel          from '../__mock__/leet.mdl'
import * as React              from 'react'
import { hot }                 from 'react-hot-loader'
import DropzoneContainer       from 'react-dropzone'
import { ModelController }     from '../lib/modelController'
import { ModelData }           from '../lib/modelDataParser'
import { LoadingScreen }       from './LoadingScreen'
import { Renderer }            from './Renderer'
import { Controller }          from './Controller'
import { GlobalStyles }        from './GlobalStyles'
import { Dropzone }            from './Dropzone'
import { BackgroundContainer } from './BackgroundContainer'
import { FileContainer }       from './FileContainer'

/** Is need to show demo */
const IS_DEMO_SHOWED = location.search.indexOf('?demo') === 0

export const App = hot(module)(() => {
  const [modelController, setModelController] = React.useState<ModelController | null>(null)
  const [modelData, setModelData] = React.useState<ModelData | null>(null)

  return (
    <FileContainer defaultFileUrl={IS_DEMO_SHOWED ? leetModel : null}>
      {({ buffer, isLoading }, { setFile }) => (
        <BackgroundContainer>
          {({ backgroundColor }, { setBackgroundColor }) => (
            <React.Fragment>
              <GlobalStyles backgroundColor={backgroundColor} color="#fff" />

              <Controller
                backgroundColor={backgroundColor}
                modelController={modelController}
                modelData={modelData}
                onBackgroundColorUpdate={setBackgroundColor}
                onModelLoad={file => setFile(file)}
              />

              {buffer ? (
                <React.Fragment>
                  <Renderer modelBuffer={buffer} setModelController={setModelController} setModelData={setModelData} />
                </React.Fragment>
              ) : isLoading ? (
                <LoadingScreen />
              ) : (
                <DropzoneContainer onDrop={files => setFile(files[0])}>
                  {({ getRootProps, getInputProps, isDragActive }) => (
                    <Dropzone wrapperProps={getRootProps()} inputProps={getInputProps()} isDragActive={isDragActive} />
                  )}
                </DropzoneContainer>
              )}
            </React.Fragment>
          )}
        </BackgroundContainer>
      )}
    </FileContainer>
  )
})
