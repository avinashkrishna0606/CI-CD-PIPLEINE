# TYPE SCRIPT

pipeline {
  agent any

  stages {
    stage('Build') {
      steps {
        sh 'mvn clean package'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t myapp .'
      }
    }

    stage('Publish Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
          sh "docker tag myapp myusername/myapp"
          sh "docker push myusername/myapp"
        }
      }
    }
  }
}
