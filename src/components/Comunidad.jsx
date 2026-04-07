import React from 'react';
import { Card } from './Card';
import { TaskList } from './TaskList';

export function Comunidad({ publicaciones }) {
  return (
    <section id="comentarios">
      <Card title="Comunidad">
        <TaskList items={publicaciones} />
      </Card>
    </section>
  );
}
