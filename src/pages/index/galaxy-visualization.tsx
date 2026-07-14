// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import StatusIndicator from '@cloudscape-design/components/status-indicator';

import { Commit } from '../../fake-server/types';

import * as styles from './galaxy-visualization.module.scss';

const STATUS_COLORS: Record<Commit['status'], THREE.Color> = {
  Passed: new THREE.Color('#37d67a'),
  Failed: new THREE.Color('#ff6961'),
  Pending: new THREE.Color('#ffcc4d'),
};

function createStarTexture(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function buildGalaxyGeometry(commits: readonly Commit[]) {
  const count = Math.max(commits.length, 1);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const arms = 3;
  const spin = 2.2;

  commits.forEach((commit, index) => {
    const t = index / count;
    const armOffset = ((index % arms) / arms) * Math.PI * 2;
    const radius = 0.6 + t * 4.5;
    const angle = t * spin * Math.PI * 2 + armOffset;
    const scatter = (1 - t) * 0.6;

    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * scatter;
    const y = (Math.random() - 0.5) * 0.4 * (1 - t * 0.5);
    const z = Math.sin(angle) * radius + (Math.random() - 0.5) * scatter;

    positions[index * 3] = x;
    positions[index * 3 + 1] = y;
    positions[index * 3 + 2] = z;

    const color = STATUS_COLORS[commit.status] ?? STATUS_COLORS.Passed;
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  });

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

export interface GalaxyVisualizationProps {
  commits: Commit[];
}

export function GalaxyVisualization({ commits }: GalaxyVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || commits.length === 0) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setRenderError(true);
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 3.5, 7);
    camera.lookAt(0, 0, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = buildGalaxyGeometry(commits);
    const material = new THREE.PointsMaterial({
      size: 0.14,
      map: createStarTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animationFrame: number;
    const animate = () => {
      points.rotation.y += 0.0015;
      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) {
        return;
      }
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      geometry.dispose();
      material.map?.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [commits]);

  return (
    <Container
      header={
        <Header
          variant="h2"
          description="Each star is a commit, arranged into a spiral galaxy by recency and colored by build status."
          actions={<Badge color="severity-neutral">Experimental</Badge>}
        >
          Commit galaxy
        </Header>
      }
    >
      <Box>
        {renderError ? (
          <div className={styles.galaxyCanvas}>
            <Box textAlign="center" padding="l">
              <StatusIndicator type="warning">3D preview unavailable: WebGL is not supported here</StatusIndicator>
            </Box>
          </div>
        ) : (
          <div ref={containerRef} className={styles.galaxyCanvas} />
        )}
      </Box>
    </Container>
  );
}
