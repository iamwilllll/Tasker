import { Routes, Route } from 'react-router';
import { TaskDashboard } from '@/features/task/pages';

function Home() {
    return <h2>Start page</h2>;
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/dashboard" element={<TaskDashboard />} />
        </Routes>
    );
}
