class ExerciseSerializer < ActiveModel::Serializer
  attributes :id, :name, :video, :muscle_group, :description, :equipment, :target
end
