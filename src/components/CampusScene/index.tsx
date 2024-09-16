import React, { useEffect, useRef, useState } from 'react'
import { Viewer, Entity, ModelGraphics, CameraFlyTo, PolygonGraphics } from 'resium'
import { Cartesian3, HeadingPitchRoll, Math as CesiumMath, Camera, Scene, Cartesian2, Color } from 'cesium'
const CampusScene: React.FC = () => {
    const viewerRef = useRef<any>(null)
    const position = Cartesian3.fromDegrees(104, 30, 0) // 北京的经纬度,您可以根据需要调整
    const uavPosition = Cartesian3.fromDegrees(104, 30, 150) // 北京的经纬度,您可以根据需要调整
    // const hpr = new HeadingPitchRoll(0, 0, 0)
    // const orientation = Transforms.headingPitchRollQuaternion(position, hpr)
    const [cameraPosition, setCameraPosition] = useState<Cartesian3 | undefined>(undefined)
    const [uavCameraView, setUavCameraView] = useState<Cartesian3[]>([])


    useEffect(() => {
        // 设置相机初始位置
        const cameraOffset = new Cartesian3(-100, 500, -350) // 根据需要调整
        const newPosition = Cartesian3.add(position, cameraOffset, new Cartesian3())
        setCameraPosition(newPosition)
    }, [])


    return (
        <Viewer full ref={viewerRef}>
            <Entity
                position={uavPosition}
                point={{ pixelSize: 10 }}
                description="UAV---"
            >
                <ModelGraphics
                    uri="/models/uav.glb"
                    minimumPixelSize={10}
                    maximumScale={300}
                />
            </Entity>
            <Entity
                position={position}
                point={{ pixelSize: 128 }}
                description="这是我们的3D园区---"
            >
                <ModelGraphics
                    uri="/models/campus.glb"
                    minimumPixelSize={128}
                    maximumScale={20000}
                />
            </Entity>

            {cameraPosition && (
                <CameraFlyTo
                    duration={10}
                    destination={cameraPosition}
                    orientation={{
                        heading: CesiumMath.toRadians(0),
                        pitch: CesiumMath.toRadians(-20),
                        roll: 0
                    }}
                />
            )}
        </Viewer>
    )
}

export default CampusScene