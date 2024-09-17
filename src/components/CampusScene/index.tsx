import React, { useEffect, useRef } from 'react';
import * as Cesium from 'cesium';

import './style.less';

const CampusScene: React.FC = () => {
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Cesium.Viewer | null>(null);

  useEffect(() => {
    renderScene();

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

  const renderScene = () => {
    if (viewerContainerRef.current && !viewerRef.current) {
      // 初始化 Cesium Viewer
      viewerRef.current = new Cesium.Viewer(viewerContainerRef.current, {
        terrainProvider: undefined,
        baseLayerPicker: true,
        geocoder: true,
        homeButton: true,
        navigationHelpButton: true,
        sceneModePicker: true,
      });

      const viewer = viewerRef.current;
      // viewer.infoBox.frame.removeAttribute("sandbox");
      viewer.infoBox.frame.setAttribute(
        'sandbox',
        'allow-same-origin allow-popups allow-forms allow-scripts'
      );
      viewer.infoBox.frame.src = 'about:blank';

      // 设置相机初始位置
      const cameraPosition = Cesium.Cartesian3.fromDegrees(104, 30, 300);
      const cameraOffset = new Cesium.Cartesian3(-100, 100, -350); // 根据需要调整
      const newCameraPosition = Cesium.Cartesian3.add(
        cameraPosition,
        cameraOffset,
        new Cesium.Cartesian3()
      );
      viewer.camera.flyTo({
        destination: newCameraPosition,
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-20),
          roll: 0,
        },
        duration: 10,
      });

      // 添加园区模型
      const campusPosition = Cesium.Cartesian3.fromDegrees(104, 30, 0);
      viewer.entities.add({
        name: 'CAMPUS',
        description: '<span style="color: #000;">CAMPUS</span>',
        position: campusPosition,
        model: {
          uri: '/models/campus_.glb',
          minimumPixelSize: 128,
          maximumScale: 20000,
        },
      });

      // 添加无人机模型
      const uavPosition = Cesium.Cartesian3.fromDegrees(104, 30, 150);
      viewer.entities.add({
        name: 'UAV',
        description: '<span style="color: #000;">UAV</span>',
        position: uavPosition,
        model: {
          uri: '/models/uav.glb',
          minimumPixelSize: 10,
          maximumScale: 300,
        },
      });
    }
  };

  return (
    <div ref={viewerContainerRef} style={{ width: '100%', height: '100vh' }} />
  );
};

export default CampusScene;
