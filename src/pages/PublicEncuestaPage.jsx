import { useParams } from 'react-router-dom';
import EncuestaForm from '../components/EncuestaForm';

export default function PublicEncuestaPage() {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Encuesta Pública
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Tu opinión es muy importante para nosotros
                    </p>
                </div>

                <EncuestaForm preselectedId={id} isPublic={true} />
            </div>
        </div>
    );
}
