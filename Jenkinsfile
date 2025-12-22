pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "reactflaskmongo"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hind-aitalla/react-flask-mongodb-devops.git'
            }
        }

        stage('Show Docker & Compose Versions') {
            steps {
                sh '''
                  docker --version
                  docker compose version
                '''
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh '''
                  docker compose down || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                  docker compose build
                '''
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                  docker compose up -d
                '''
            }
        }

        stage('Check Running Containers') {
            steps {
                sh '''
                  docker ps
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès'
        }
        failure {
            echo '❌ Échec du pipeline : vérifie les logs'
        }
    }
}

