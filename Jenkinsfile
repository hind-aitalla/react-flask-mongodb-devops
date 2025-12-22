pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "react-flask-mongodb-pipeline"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hind-aitalla/react-flask-mongodb-devops.git'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh '''
                  docker-compose down --remove-orphans || true
                  docker ps -aq | xargs -r docker rm -f || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès'
        }
        failure {
            echo '❌ Échec du pipeline'
        }
    }
}

