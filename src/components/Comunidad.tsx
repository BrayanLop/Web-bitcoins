import { Card } from './Card';
import { TaskList } from './TaskList';
import type { CommunityPost } from '../types';

export function Comunidad({ publicaciones }: { publicaciones: CommunityPost[] }) {
  return (
    <section id="comentarios">
      <Card title="Comunidad">
        <TaskList items={publicaciones} />
      </Card>
    </section>
  );
}
