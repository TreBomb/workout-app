class CreateExercises < ActiveRecord::Migration[6.1]
  def change
    create_table :exercises do |t|
      t.string :name
      t.string :video
      t.string :muscle_group
      t.string :description

      t.timestamps
    end
  end
end
