import { FC, useState, } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

type TaskInputFormProps = {
  onAddTask: (task: string) => void;
}

const TaskInputForm: FC<TaskInputFormProps> = ({ onAddTask }) => {
  const [task, setTask] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      onAddTask(task);
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt="8">
        <Input
          variant="filled"
          placeholder="新しいタスクを追加..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button colorScheme="blue" px="8" type="submit">
          追加
        </Button>
      </HStack>
    </form>
  );
}

export default TaskInputForm;
