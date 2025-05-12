from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Subject

class SubjectTests(APITestCase):
    def setUp(self):
        self.subject_data = {'name': 'Mathematics'}
        self.subject = Subject.objects.create(**self.subject_data)

    def test_create_subject(self):
        response = self.client.post(reverse('subject-list'), self.subject_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Subject.objects.count(), 2)
        self.assertEqual(Subject.objects.get(id=response.data['id']).name, 'Mathematics')

    def test_get_subjects(self):
        response = self.client.get(reverse('subject-list'), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_subject(self):
        response = self.client.get(reverse('subject-detail', args=[self.subject.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.subject.name)

    def test_update_subject(self):
        updated_data = {'name': 'Physics'}
        response = self.client.put(reverse('subject-detail', args=[self.subject.id]), updated_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.subject.refresh_from_db()
        self.assertEqual(self.subject.name, 'Physics')

    def test_delete_subject(self):
        response = self.client.delete(reverse('subject-detail', args=[self.subject.id]), format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Subject.objects.count(), 0)