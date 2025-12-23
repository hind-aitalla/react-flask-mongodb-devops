pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "reactflaskmongo"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                echo 'Pull du projet depuis GitHub'
                git branch: 'main',
                    url: 'https://github.com/hind-aitalla/react-flask-mongodb-devops.git'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Build des images Docker avec Docker Compose'
                sh 'docker compose build'
            }
        }

        stage('Run Application') {
            steps {
                echo 'Lancement de l’application localement'
                sh '''
                docker compose down || true
                docker compose up -d
                '''
            }
        }

        stage('Check Running Containers') {
            steps {
                echo 'Vérification des conteneurs en cours d’exécution'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès – Application lancée'
        }
        failure {
            echo '❌ Échec du pipeline – Vérifiez les logs Jenkins'
        }
    }
}

